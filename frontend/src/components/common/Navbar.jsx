import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiGrid, 
  FiTarget, 
  FiPieChart,
  FiStar,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX
} from 'react-icons/fi'
import './Navbar.css'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/images/logo.png" alt="TradeSim Pro" className="logo-image" />
          <span>TradeSim Pro</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
                <FiGrid /> <span>Dashboard</span>
              </Link>
              <Link to="/trade" className="nav-link" onClick={closeMenu}>
                <FiTarget /> <span>Trade</span>
              </Link>
              <Link to="/positions" className="nav-link" onClick={closeMenu}>
                <FiPieChart /> <span>Positions</span>
              </Link>
              <Link to="/watchlist" className="nav-link" onClick={closeMenu}>
                <FiStar /> <span>Watchlist</span>
              </Link>
              <span className="nav-balance">
                ${parseFloat(user?.account_balance || 0).toLocaleString()}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                <FiLogOut /> <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={closeMenu}>
                <FiLogIn /> <span>Login</span>
              </Link>
              <Link to="/register" className="btn-register" onClick={closeMenu}>
                <FiUserPlus /> <span>Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeMenu}></div>
        )}
      </div>
    </nav>
  )
}

export default Navbar