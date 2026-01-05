import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { tradingAPI } from '../api/trading'
import { authAPI } from '../api/auth'
import { toast } from 'react-toastify'
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiActivity, 
  FiAward,
  FiPlus,
  FiPieChart,
  FiClock,
  FiStar,
  FiRefreshCw,
  FiBarChart2
} from 'react-icons/fi'
import TradingViewChart from '../components/common/TradingViewChart'
import ChartModal from '../components/common/ChartModal'
import './Dashboard.css'

const Dashboard = () => {
  const { user, updateBalance } = useAuth()
  const [prices, setPrices] = useState([])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [resetting, setResetting] = useState(false)
  const [chartModal, setChartModal] = useState({ isOpen: false, symbol: '' })

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchPrices, 30000)
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

  const handleResetBalance = async () => {
    if (!window.confirm('Are you sure you want to reset your balance to $10,000? All open positions will remain.')) {
      return
    }
    
    setResetting(true)
    try {
      const response = await authAPI.resetBalance()
      updateBalance(response.new_balance)
      toast.success('Balance reset to $10,000!')
    } catch (error) {
      toast.error('Failed to reset balance')
    } finally {
      setResetting(false)
    }
  }

  const openChart = (symbol) => {
    setChartModal({ isOpen: true, symbol })
  }

  const closeChart = () => {
    setChartModal({ isOpen: false, symbol: '' })
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
        <h1>Welcome, {user?.username}!</h1>
        <p>Here's your trading overview</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">
            <FiDollarSign />
          </span>
          <div className="stat-info">
            <h3>Account Balance</h3>
            <p className="stat-value">
              ${parseFloat(user?.account_balance || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">
            <FiTrendingUp />
          </span>
          <div className="stat-info">
            <h3>Open Positions</h3>
            <p className="stat-value">{positions.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">
            <FiActivity />
          </span>
          <div className="stat-info">
            <h3>Unrealized P&L</h3>
            <p className={`stat-value ${totalUnrealizedPnL >= 0 ? 'text-success' : 'text-danger'}`}>
              {totalUnrealizedPnL >= 0 ? '+' : ''}${totalUnrealizedPnL.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">
            <FiAward />
          </span>
          <div className="stat-info">
            <h3>Trading Tier</h3>
            <p className="stat-value">{user?.trading_tier || 'BASIC'}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/trade" className="action-btn primary">
          <FiPlus /> New Trade
        </Link>
        <Link to="/positions" className="action-btn secondary">
          <FiPieChart /> Positions
        </Link>
        <Link to="/history" className="action-btn secondary">
          <FiClock /> History
        </Link>
        <Link to="/watchlist" className="action-btn secondary">
          <FiStar /> Watchlist
        </Link>
        <button 
          onClick={handleResetBalance} 
          disabled={resetting}
          className="action-btn reset"
        >
          <FiRefreshCw className={resetting ? 'spin' : ''} /> 
          {resetting ? 'Resetting...' : 'Reset Balance'}
        </button>
      </div>

      {/* Live Prices with Charts */}
      <div className="section">
        <h2>Live Prices</h2>
        <div className="prices-grid">
          {prices.map((asset) => (
            <div key={asset.id} className="price-card">
              <div className="price-header">
                <span className="asset-symbol">{asset.symbol}</span>
                <span className={`asset-type ${asset.asset_type.toLowerCase()}`}>
                  {asset.asset_type}
                </span>
              </div>
              <p className="asset-name">{asset.name}</p>
              <p className="asset-price">
                {asset.price ? `$${parseFloat(asset.price).toLocaleString()}` : 'Loading...'}
              </p>
              
              {/* Mini Chart */}
              <div className="mini-chart">
                <TradingViewChart symbol={asset.symbol} />
              </div>
              
              {/* Chart Button */}
              <button 
                className="btn-view-chart"
                onClick={() => openChart(asset.symbol)}
              >
                <FiBarChart2 /> View Chart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      {positions.length > 0 && (
        <div className="section">
          <h2>Open Positions</h2>
          <div className="positions-table">
            <table>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Type</th>
                  <th>Entry Price</th>
                  <th>Current Price</th>
                  <th>P&L</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos) => (
                  <tr key={pos.id}>
                    <td>{pos.asset_symbol}</td>
                    <td className={pos.trade_type === 'BUY' ? 'text-success' : 'text-danger'}>
                      {pos.trade_type}
                    </td>
                    <td>${parseFloat(pos.entry_price).toLocaleString()}</td>
                    <td>${parseFloat(pos.current_price || 0).toLocaleString()}</td>
                    <td className={parseFloat(pos.unrealized_pnl || 0) >= 0 ? 'text-success' : 'text-danger'}>
                      {parseFloat(pos.unrealized_pnl || 0) >= 0 ? '+' : ''}
                      ${parseFloat(pos.unrealized_pnl || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chart Modal */}
      <ChartModal 
        symbol={chartModal.symbol}
        isOpen={chartModal.isOpen}
        onClose={closeChart}
      />
    </div>
  )
}

export default Dashboard