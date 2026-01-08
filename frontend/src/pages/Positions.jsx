import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { tradingAPI } from '../api/trading'
import { FiPieChart, FiPlus, FiX } from 'react-icons/fi'
import './Positions.css'

const Positions = () => {
  const { updateBalance } = useAuth()
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [closingId, setClosingId] = useState(null)

  useEffect(() => {
    fetchPositions()
    const interval = setInterval(fetchPositions, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchPositions = async () => {
    try {
      const data = await tradingAPI.getOpenPositions()
      setPositions(data)
    } catch (error) {
      toast.error('Failed to load positions')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = async (tradeId) => {
    setClosingId(tradeId)
    
    try {
      const response = await tradingAPI.closeTrade(tradeId)
      updateBalance(response.new_balance)
      
      const pnl = parseFloat(response.pnl)
      if (pnl >= 0) {
        toast.success(`Trade closed! Profit: +$${pnl.toFixed(2)}`)
      } else {
        toast.info(`Trade closed. Loss: -$${Math.abs(pnl).toFixed(2)}`)
      }
      
      fetchPositions()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to close trade')
    } finally {
      setClosingId(null)
    }
  }

  const totalPnL = positions.reduce((sum, pos) => {
    return sum + parseFloat(pos.unrealized_pnl || 0)
  }, 0)

  if (loading) {
    return <div className="loading">Loading positions...</div>
  }

  return (
    <div className="positions-page">
      {/* Video Background */}
      <div className="page-video-bg">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="page-bg-video"
        >
          <source src="/static/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="page-video-overlay"></div>
      </div>

      {/* Content */}
      <div className="page-content">
        <div className="positions-header">
          <div>
            <h1>Open Positions</h1>
            <p>{positions.length} active trade{positions.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="total-pnl">
            <span>Total Unrealized P&L</span>
            <p className={totalPnL >= 0 ? 'text-success' : 'text-danger'}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </p>
          </div>
        </div>

        {positions.length === 0 ? (
          <div className="no-positions">
            <span className="icon">
              <FiPieChart />
            </span>
            <h2>No Open Positions</h2>
            <p>Start trading to see your positions here</p>
            <Link to="/trade" className="btn-start">
              <FiPlus /> Open a Trade
            </Link>
          </div>
        ) : (
          <div className="positions-list">
            {positions.map(position => {
              const pnl = parseFloat(position.unrealized_pnl || 0)
              const pnlPercent = parseFloat(position.unrealized_pnl_percent || 0)
              
              return (
                <div key={position.id} className="position-card">
                  <div className="position-main">
                    <div className="position-asset">
                      <h3>{position.asset_symbol}</h3>
                      <span className={`trade-type ${position.trade_type.toLowerCase()}`}>
                        {position.trade_type}
                      </span>
                    </div>
                    
                    <div className="position-details">
                      <div className="detail">
                        <span>Quantity</span>
                        <p>{parseFloat(position.quantity).toFixed(6)}</p>
                      </div>
                      <div className="detail">
                        <span>Entry Price</span>
                        <p>${parseFloat(position.entry_price).toLocaleString()}</p>
                      </div>
                      <div className="detail">
                        <span>Current Price</span>
                        <p>${parseFloat(position.current_price || 0).toLocaleString()}</p>
                      </div>
                      <div className="detail">
                        <span>Position Value</span>
                        <p>${parseFloat(position.position_value || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="position-pnl">
                    <div className={`pnl-value ${pnl >= 0 ? 'profit' : 'loss'}`}>
                      <span>Unrealized P&L</span>
                      <p>{pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}</p>
                      <span className="pnl-percent">({pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)</span>
                    </div>
                    
                    <button
                      onClick={() => handleClose(position.id)}
                      disabled={closingId === position.id}
                      className="btn-close"
                    >
                      {closingId === position.id ? 'Closing...' : 'Close Position'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Positions