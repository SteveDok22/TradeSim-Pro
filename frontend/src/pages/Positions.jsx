import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { tradingAPI } from '../api/trading'
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
        toast.success(`Trade closed! Profit: +$${pnl.toFixed(2)} 🎉`)
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
          <span className="icon">📊</span>
          <h2>No Open Positions</h2>
          <p>Start trading to see your positions here</p>
          <a href="/trade" className="btn-start">Open a Trade</a>
        </div>
      ) : (
        
    </div>
  )
}

export default Positions