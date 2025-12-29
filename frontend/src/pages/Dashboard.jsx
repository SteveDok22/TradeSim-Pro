import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { tradingAPI } from '../api/trading'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()
  const [prices, setPrices] = useState([])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchPrices, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [pricesData, positionsData] = await Promise.all([
        tradingAPI.getPrices(),
        tradingAPI.getOpenPositions()
      ])
      setPrices(pricesData)
      setPositions(positionsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPrices = async () => {
    try {
      const pricesData = await tradingAPI.getPrices()
      setPrices(pricesData)
    } catch (error) {
      console.error('Error fetching prices:', error)
    }
  }

  const totalUnrealizedPnL = positions.reduce((sum, pos) => {
    return sum + parseFloat(pos.unrealized_pnl || 0)
  }, 0)

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.username}! 👋</h1>
        <p>Here's your trading overview</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <h3>Account Balance</h3>
            <p className="stat-value">
              ${parseFloat(user?.account_balance || 0).toLocaleString()}
            </p>
          </div>
        </div>
       </div>

       {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/trade" className="action-btn primary">
          ➕ New Trade
        </Link>
        <Link to="/positions" className="action-btn secondary">
          📊 View Positions
        </Link>
        <Link to="/history" className="action-btn secondary">
          📜 Trade History
        </Link>
      </div>

    </div>
  )
}

export default Dashboard
