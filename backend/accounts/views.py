from rest_framework import status, generics, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Account, Transaction
from .serializers import (
    UserSerializer, 
    UserRegistrationSerializer,
    AccountSerializer,
    TransactionSerializer
)


class RegisterView(generics.CreateAPIView):
    """User registration endpoint"""
    
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """User login endpoint"""
    
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                'error': 'Please provide both email and password'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user
        user = User.objects.filter(email=email).first()
        
        if user and user.check_password(password):
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """User profile endpoint"""
    
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class AccountListCreateView(generics.ListCreateAPIView):
    """List and create accounts"""
    
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Generate unique account number
        import random
        account_number = ''.join([str(random.randint(0, 9)) for _ in range(10)])
        account = serializer.save(user=self.request.user, account_number=account_number)
        # Create sample transactions
        Transaction.objects.create(
            account=account,
            transaction_type='deposit',
            amount=50000.00,
            status='completed',
            description='Initial deposit'
        )
        Transaction.objects.create(
            account=account,
            transaction_type='deposit',
            amount=25000.00,
            status='completed',
            description='Bonus deposit'
        )


class AccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, and delete account"""
    
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)


class TransactionListCreateView(generics.ListCreateAPIView):
    """List and create transactions"""
    
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Transaction.objects.filter(account__user=self.request.user)
    
    def perform_create(self, serializer):
        transaction = serializer.save(status='completed')
        if transaction.transaction_type == 'withdrawal':
            if not transaction.withdrawal_method:
                raise serializers.ValidationError({"withdrawal_method": "Withdrawal method is required for withdrawal transactions."})
            account = transaction.account
            if account.balance >= transaction.amount:
                account.balance -= transaction.amount
                account.save()
            else:
                transaction.status = 'failed'
                transaction.save()
                raise serializers.ValidationError({"amount": "Insufficient balance."})
        elif transaction.transaction_type == 'deposit':
            account = transaction.account
            account.balance += transaction.amount
            account.save()


class TransactionDetailView(generics.RetrieveAPIView):
    """Retrieve transaction details"""
    
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Transaction.objects.filter(account__user=self.request.user)
