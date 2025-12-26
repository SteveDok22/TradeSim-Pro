import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to TradeSim Pro</h1>
        <p>Practice trading cryptocurrencies, stocks, and forex with virtual money.</p>
        <p>Start with $10,000 - No risk, all the learning!</p>
        
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn-cta">
            Go to Dashboard
          </Link>
        ) : (
          <div className="hero-buttons">
            <Link to="/register" className="btn-cta">
              Start Trading Now
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        )}
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">📈</span>
          <h3>Real-Time Prices</h3>
          <p>Live prices from Binance and Alpha Vantage</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💰</span>
          <h3>Virtual $10,000</h3>
          <p>Practice without risking real money</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3>Track Performance</h3>
          <p>Monitor your PnL and win rate</p>
        </div>
      </div>
    </div>
  )
}

export default Home