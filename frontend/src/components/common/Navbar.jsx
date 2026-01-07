import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiGrid, 
  FiTarget, 
  FiPieChart,
  FiStar,
  FiLogOut,
  FiLogIn,
  FiUserPlus
} from 'react-icons/fi'
import './Navbar.css'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="TradeSim Pro" className="logo-image" />
          <span>TradeSim Pro</span>
        </Link>

        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <FiGrid /> Dashboard
              </Link>
              <Link to="/trade" className="nav-link">
                <FiTarget /> Trade
              </Link>
              <Link to="/positions" className="nav-link">
                <FiPieChart /> Positions
              </Link>
              <Link to="/watchlist" className="nav-link">
                <FiStar /> Watchlist
              </Link>
              <span className="nav-balance">
                ${parseFloat(user?.account_balance || 0).toLocaleString()}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <FiLogIn /> Login
              </Link>
              <Link to="/register" className="btn-register">
                <FiUserPlus /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar