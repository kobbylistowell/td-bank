import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [account, setAccount] = useState({
    account_number: '4771 6080 1080 7889',
    balance: 1000000,
    card_provider: 'Fincard',
    card_level: 'Platinum Debit',
    valid_thru: '08/25',
    currency: 'USD',
  })

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: 'Paypal - Received',
      date: '20 December 2020, 08:20 AM',
      amount: 8200,
      type: 'credit',
      status: 'completed',
      method: 'IBAN',
    },
    {
      id: 2,
      title: 'Spotify Premium',
      date: '19 December 2020, 07:25 PM',
      amount: -199,
      type: 'debit',
      status: 'completed',
      method: 'Card',
    },
    {
      id: 3,
      title: 'Transferwise - Received',
      date: '19 December 2020, 10:15 AM',
      amount: 1200,
      type: 'credit',
      status: 'completed',
      method: 'Crypto',
    },
    {
      id: 4,
      title: 'H&M Payment',
      date: '15 December 2020, 06:30 PM',
      amount: -2200,
      type: 'debit',
      status: 'completed',
      method: 'IBAN',
    },
  ])
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
  const [depositMethod, setDepositMethod] = useState('Crypto')
  const [withdrawMethod, setWithdrawMethod] = useState('Crypto')

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleDeposit = async (e) => {
    e.preventDefault()
    const amount = parseFloat(depositAmount || '0')
    if (!amount || amount <= 0) return

    setAccount(prev => ({
      ...prev,
      balance: prev.balance + amount,
    }))

    setTransactions(prev => [
      {
        id: prev.length + 1,
        title: 'Manual Deposit',
        date: new Date().toLocaleString(),
        amount,
        type: 'credit',
        status: 'pending',
        method: depositMethod,
      },
      ...prev,
    ])

    setDepositAmount('')
    setDepositMethod('Crypto')
    setShowDepositModal(false)
  }

  const handleWithdraw = async (e) => {
    e.preventDefault()
    const amount = parseFloat(withdrawAmount || '0')
    if (!amount || amount <= 0) return

    setAccount(prev => ({
      ...prev,
      balance: prev.balance - amount,
    }))

    setTransactions(prev => [
      {
        id: prev.length + 1,
        title: 'Manual Withdrawal',
        date: new Date().toLocaleString(),
        amount: -amount,
        type: 'debit',
        status: 'pending',
        method: withdrawMethod,
      },
      ...prev,
    ])

    setWithdrawAmount('')
    setWithdrawMethod('Crypto')
    setShowWithdrawModal(false)
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
      return `Your current balance is $${account?.balance || '0.00'}. Is there anything else I can I help you with?`
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

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">F</div>
          <div className="sidebar-brand">
            <span className="brand-title">FinBank</span>
            <span className="brand-subtitle">Digital Banking</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <p className="menu-label">Main Menu</p>
          <button className="menu-item active">
            <span className="menu-dot" />
            <span>Dashboard</span>
          </button>
          <button className="menu-item">
            <span className="menu-dot" />
            <span>Transactions</span>
          </button>
          <button className="menu-item">
            <span className="menu-dot" />
            <span>Card Center</span>
          </button>
          <button className="menu-item">
            <span className="menu-dot" />
            <span>Contacts</span>
          </button>
          <button className="menu-item">
            <span className="menu-dot" />
            <span>E-Wallet Center</span>
          </button>
          <button className="menu-item">
            <span className="menu-dot" />
            <span>Reports</span>
          </button>

          <p className="menu-label">Others</p>
          <button className="menu-item">
            <span className="menu-dot" />
            <span>Settings</span>
          </button>
          <button className="menu-item">
            <span className="menu-dot" />
            <span>Help Center</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-text">
            <h1>Welcome to FinBank</h1>
            <p>
              Hi, {user?.first_name || 'Barly Vallendita'}. Welcome back.
            </p>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Toggle theme">
              <i className="bi bi-moon" />
            </button>
            <button className="icon-button" aria-label="Notifications">
              <i className="bi bi-bell" />
            </button>
            <div className="user-avatar">
              {user?.first_name?.[0] || 'B'}
            </div>
          </div>
        </header>

        <section className="dashboard-grid">
          <div className="card account-card">
            <div className="account-card-header">
              <div>
                <p className="muted">Debit Card Account</p>
                <h3>{account.card_provider}</h3>
              </div>
              <span className="chip">{account.card_level}</span>
            </div>

            <div className="account-card-body">
              <div className="card-number">
                {account.account_number}
              </div>
              <div className="card-footer">
                <div>
                  <p className="muted">Valid Thru</p>
                  <p>{account.valid_thru}</p>
                </div>
                <div className="visa-badge">VISA</div>
              </div>
            </div>
          </div>

          <div className="card balance-card">
            <p className="muted">Your Total Balance</p>
            <h2>
              ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
            <p className="muted small">As of {new Date().toLocaleString()}</p>
            <div className="balance-actions">
              <button
                className="pill-button primary"
                onClick={() => setShowWithdrawModal(true)}
              >
                Withdraw
              </button>
              <button
                className="pill-button"
                onClick={() => setShowDepositModal(true)}
              >
                Deposit
              </button>
              <button className="pill-button">More</button>
            </div>
          </div>

          <div className="card transactions-card">
            <div className="card-header-row">
              <h3>Recent Transactions</h3>
              <span className="muted small">Last 7 Days</span>
            </div>

            <div className="transactions-list">
              {transactions.map(tx => (
                <div key={tx.id} className="transaction-row">
                  <div className="tx-icon">
                    {tx.type === 'credit' ? '+' : '−'}
                  </div>
                  <div className="tx-main">
                    <p className="tx-title">{tx.title}</p>
                    <p className="tx-date muted small">
                      {tx.date} • {tx.method || '—'}
                    </p>
                  </div>
                  <div className="tx-right">
                    <div className={`tx-amount ${tx.amount >= 0 ? 'positive' : 'negative'}`}>
                      {tx.amount >= 0 ? '+' : '-'}$
                      {Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <span className={`tx-status tx-status-${tx.status}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card expenses-card">
            <div className="card-header-row">
              <h3>Expenses Instead</h3>
            </div>
            <div className="expenses-content">
              <div className="gauge">
                <div className="gauge-inner">
                  <span className="gauge-value">85.5%</span>
                  <span className="muted small">Normal Level</span>
                </div>
              </div>
              <div className="expenses-details">
                <p className="muted small">Total Exp:</p>
                <p className="expenses-amount">$1,820.80</p>
              </div>
            </div>
          </div>
        </section>
      </main>

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
              <div className="form-group">
                <label>Method</label>
                <div className="method-options">
                  <label>
                    <input
                      type="radio"
                      name="depositMethod"
                      value="Crypto"
                      checked={depositMethod === 'Crypto'}
                      onChange={(e) => setDepositMethod(e.target.value)}
                    />
                    Crypto
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="depositMethod"
                      value="IBAN"
                      checked={depositMethod === 'IBAN'}
                      onChange={(e) => setDepositMethod(e.target.value)}
                    />
                    IBAN
                  </label>
                </div>
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
              <div className="form-group">
                <label>Method</label>
                <div className="method-options">
                  <label>
                    <input
                      type="radio"
                      name="withdrawMethod"
                      value="Crypto"
                      checked={withdrawMethod === 'Crypto'}
                      onChange={(e) => setWithdrawMethod(e.target.value)}
                    />
                    Crypto
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="withdrawMethod"
                      value="IBAN"
                      checked={withdrawMethod === 'IBAN'}
                      onChange={(e) => setWithdrawMethod(e.target.value)}
                    />
                    IBAN
                  </label>
                </div>
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
