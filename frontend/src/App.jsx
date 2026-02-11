import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Withdraw from './pages/Withdraw'
import Admin from './pages/Admin'
import './App.css'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || '')
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || '')

  useEffect(() => {
    if (accessToken) {
      // Optionally fetch user data if needed
    }
  }, [accessToken])

  const login = (userData, tokens) => {
    setUser(userData)
    setAccessToken(tokens.access)
    setRefreshToken(tokens.refresh)
    localStorage.setItem('access_token', tokens.access)
    localStorage.setItem('refresh_token', tokens.refresh)
  }

  const logout = () => {
    setUser(null)
    setAccessToken('')
    setRefreshToken('')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  const value = { user, accessToken, refreshToken, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
