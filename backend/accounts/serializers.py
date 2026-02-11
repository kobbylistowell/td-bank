from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Account, Transaction

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 
                  'phone_number', 'date_of_birth', 'address', 'created_at')
        read_only_fields = ('id', 'created_at')


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password', 'password2')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class AccountSerializer(serializers.ModelSerializer):
    """Serializer for Account model"""
    
    user_email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Account
        fields = ('id', 'user', 'user_email', 'account_number', 'account_type', 
                  'balance', 'currency', 'is_active', 'created_at', 'updated_at')
        read_only_fields = ('id', 'account_number', 'balance', 'created_at', 'updated_at')


class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for Transaction model"""
    
    account_number = serializers.CharField(source='account.account_number', read_only=True)
    
    class Meta:
        model = Transaction
        fields = ('id', 'account', 'account_number', 'transaction_type', 'amount', 
                  'status', 'description', 'recipient_account', 'created_at')
        read_only_fields = ('id', 'status', 'created_at')
