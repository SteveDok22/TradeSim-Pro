import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  FiTrendingUp, 
  FiDollarSign, 
  FiBarChart2,
  FiArrowRight
} from 'react-icons/fi'
import './Home.css'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="home">
      {/* Full Screen Video Background */}
      <div className="fullscreen-video-bg">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="bg-video"
        >
          <source src="/static/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Hero Section - как раньше */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to TradeSim Pro</h1>
          <p>Practice trading cryptocurrencies, stocks, and forex with virtual money.</p>
          <p>Start with $10,000 - No risk, all the learning!</p>
          
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-cta">
              Go to Dashboard <FiArrowRight />
            </Link>
          ) : (
            <div className="hero-buttons">
              <Link to="/register" className="btn-cta">
                Start Trading Now <FiArrowRight />
              </Link>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">
            <FiTrendingUp />
          </span>
          <h3>Real-Time Prices</h3>
          <p>Live prices from Binance and Alpha Vantage</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">
            <FiDollarSign />
          </span>
          <h3>Virtual $10,000</h3>
          <p>Practice without risking real money</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">
            <FiBarChart2 />
          </span>
          <h3>Track Performance</h3>
          <p>Monitor your PnL and win rate</p>
        </div>
      </div>
    </div>
  )
}

export default Home