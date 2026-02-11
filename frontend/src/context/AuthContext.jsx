import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
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
