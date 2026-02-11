import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your TD Bank AI assistant. How can I help you today?' }
  ])
  const [chatInput, setChatInput] = useState('')
  const chatEndRef = useRef(null)

  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  useEffect(() => {
    fetchAccountData()
    fetchTransactions()
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const fetchAccountData = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/accounts/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.length > 0) {
        setAccount(data[0])
      } else {
        // Create default account
        await createAccount()
      }
    } catch (err) {
      console.error('Error fetching account:', err)
    }
  }

  const createAccount = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/accounts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account_type: 'savings' })
      })
      const data = await response.json()
      setAccount(data)
    } catch (err) {
      console.error('Error creating account:', err)
    }
  }

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/transactions/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setTransactions(data)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    }
  }

  const handleDeposit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_BASE_URL}/api/auth/transactions/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account: account.id,
          transaction_type: 'deposit',
          amount: depositAmount,
          description: 'Deposit'
        })
      })
      setDepositAmount('')
      setShowDepositModal(false)
      fetchAccountData()
      fetchTransactions()
    } catch (err) {
      console.error('Error making deposit:', err)
    }
  }

  const handleWithdraw = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_BASE_URL}/api/auth/transactions/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account: account.id,
          transaction_type: 'withdrawal',
          amount: withdrawAmount,
          description: 'Withdrawal'
        })
      })
      setWithdrawAmount('')
      setShowWithdrawModal(false)
      fetchAccountData()
      fetchTransactions()
    } catch (err) {
      console.error('Error making withdrawal:', err)
    }
  }

  const handleChatSend = () => {
    if (!chatInput.trim()) return

    const userMessage = { type: 'user', text: chatInput }
    setChatMessages(prev => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(chatInput)
      setChatMessages(prev => [...prev, { type: 'bot', text: botResponse }])
    }, 1000)

    setChatInput('')
  }

  const generateBotResponse = (input) => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('balance')) {
      return `Your current balance is $${account?.balance || '0.00'}. Is there anything else I can help you with?`
    } else if (lowerInput.includes('deposit')) {
      return 'To make a deposit, click the "Deposit" button in your dashboard. You can deposit using various methods.'
    } else if (lowerInput.includes('withdraw')) {
      return 'To withdraw funds, click the "Withdraw" button. Make sure you have sufficient balance in your account.'
    } else if (lowerInput.includes('transaction') || lowerInput.includes('history')) {
      return 'You can view your transaction history in the "Recent Transactions" section below. It shows all your deposits and withdrawals.'
    } else if (lowerInput.includes('account')) {
      return `Your account number is ${account?.account_number || 'pending'}. Your account is ${account?.is_active ? 'active' : 'inactive'}.`
    } else if (lowerInput.includes('help')) {
      return 'I can help you with: checking your balance, making deposits, withdrawals, viewing transactions, and general account information. What would you like to know?'
    } else {
      return 'I\'m here to help! You can ask me about your balance, deposits, withdrawals, transactions, or account information.'
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!account) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <div className="logo-icon">TD</div>
          <span>TD Bank</span>
        </div>
        <div className="nav-user">
          <span>Welcome, {user?.first_name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Manage your account and transactions</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card account-number">
            <div className="stat-label">Account Number</div>
            <div className="stat-value">{account.account_number}</div>
          </div>

          <div className="stat-card balance">
            <div className="stat-label">Available Balance</div>
            <div className="stat-value">${parseFloat(account.balance).toFixed(2)} USD</div>
          </div>
        </div>

        <div className="actions-grid">
          <div className="action-card" onClick={() => setShowDepositModal(true)}>
            <div className="action-icon">
              <i className="bi bi-credit-card-2-front" />
            </div>
            <div className="action-label">Deposits</div>
            <div className="action-value">${parseFloat(account.balance).toFixed(2)} USD</div>
          </div>

          <div className="action-card" onClick={() => setShowWithdrawModal(true)}>
            <div className="action-icon">
              <i className="bi bi-cash-stack" />
            </div>
            <div className="action-label">Withdrawals</div>
            <div className="action-value">${parseFloat(account.balance).toFixed(2)} USD</div>
          </div>

          <div className="action-card">
            <div className="action-icon">🔄</div>
            <div className="action-label">Transactions</div>
            <div className="action-value">{transactions.length}</div>
          </div>
        </div>

        <div className="transactions-section">
          <h2>Recent Transactions</h2>
          <div className="transactions-table">
            <div className="table-header">
              <div>Date</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="table-row">
                  <div>{new Date(tx.created_at).toLocaleDateString()}</div>
                  <div className={`tx-type ${tx.transaction_type}`}>
                    {tx.transaction_type}
                  </div>
                  <div className={tx.transaction_type === 'deposit' ? 'positive' : 'negative'}>
                    {tx.transaction_type === 'deposit' ? '+' : '-'}${parseFloat(tx.amount).toFixed(2)}
                  </div>
                  <div><span className={`status ${tx.status}`}>{tx.status}</span></div>
                </div>
              ))
            ) : (
              <div className="no-transactions">No transactions yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button className="chat-toggle" onClick={() => setShowChat(!showChat)}>
        <span className="chat-icon">
          <i className="bi bi-chat-dots" />
        </span>
      </button>

      {/* AI Chat Window */}
      {showChat && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>
              <i className="bi bi-robot chat-header-icon" /> AI Assistant
            </h3>
            <button onClick={() => setShowChat(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
            />
            <button onClick={handleChatSend}>Send</button>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="modal-overlay" onClick={() => setShowDepositModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Make a Deposit</h2>
            <form onSubmit={handleDeposit}>
              <div className="form-group">
                <label>Amount (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowDepositModal(false)}>Cancel</button>
                <button type="submit" className="primary">Deposit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Make a Withdrawal</h2>
            <form onSubmit={handleWithdraw}>
              <div className="form-group">
                <label>Amount (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowWithdrawModal(false)}>Cancel</button>
                <button type="submit" className="primary">Withdraw</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
