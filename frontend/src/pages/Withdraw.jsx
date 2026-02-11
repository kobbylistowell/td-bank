import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function Withdraw() {
  const [accounts, setAccounts] = useState([])
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('iban')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('Please login first')
      navigate('/login')
      return
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setAccounts(data)
      }
    } catch (error) {
      console.error('Error fetching accounts:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    if (!accounts.length) return

    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          account: accounts[0].id,
          transaction_type: 'withdrawal',
          amount: parseFloat(amount),
          withdrawal_method: method,
          description
        })
      })
      if (response.ok) {
        alert('Withdrawal successful!')
        navigate('/dashboard')
      } else {
        const error = await response.json()
        alert('Error: ' + JSON.stringify(error))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Withdrawal failed')
    }
  }

  return (
    <div className="container mt-5">
      <h1>Withdraw Funds</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Withdrawal Method</label>
          <select
            className="form-select"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="iban">IBAN</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Withdraw</button>
      </form>
    </div>
  )
}

export default Withdraw
