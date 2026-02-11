import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">TD</div>
          <span className="logo-text">TD Bank</span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/" className="nav-link">Services</Link>
          <Link to="/" className="nav-link">About</Link>
          <Link to="/" className="nav-link">Contact</Link>
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
