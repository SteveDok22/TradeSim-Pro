import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { tradingAPI } from '../api/trading'
import './History.css'

const History = () => {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const data = await tradingAPI.getTradeHistory()
      setTrades(data)
    } catch (error) {
      toast.error('Failed to load trade history')
    } finally {
      setLoading(false)
    }
  }

  const totalPnL = trades.reduce((sum, trade) => sum + parseFloat(trade.pnl || 0), 0)
  const winningTrades = trades.filter(t => parseFloat(t.pnl) > 0).length
  const winRate = trades.length > 0 ? ((winningTrades / trades.length) * 100).toFixed(1) : 0

  if (loading) {
    return <div className="loading">Loading history...</div>
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Trade History</h1>
        <p>{trades.length} closed trade{trades.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Stats */}
      <div className="history-stats">
        <div className="stat-card">
          <span>Total P&L</span>
          <p className={totalPnL >= 0 ? 'text-success' : 'text-danger'}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
          </p>
        </div>
        <div className="stat-card">
          <span>Win Rate</span>
          <p>{winRate}%</p>
        </div>
        <div className="stat-card">
          <span>Winning</span>
          <p className="text-success">{winningTrades}</p>
        </div>
        <div className="stat-card">
          <span>Losing</span>
          <p className="text-danger">{trades.length - winningTrades}</p>
        </div>
      </div>

      {trades.length === 0 ? (
        <div className="no-history">
          <span className="icon">📜</span>
          <h2>No Trade History</h2>
          <p>Your closed trades will appear here</p>
        </div>
      ) : (
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>P&L</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {trades.map(trade => {
                const pnl = parseFloat(trade.pnl || 0)
                return (
                  <tr key={trade.id}>
                    <td><strong>{trade.asset_symbol}</strong></td>
                    <td className={trade.trade_type === 'BUY' ? 'text-success' : 'text-danger'}>
                      {trade.trade_type}
                    </td>
                    <td>{parseFloat(trade.quantity).toFixed(6)}</td>
                    <td>${parseFloat(trade.entry_price).toLocaleString()}</td>
                    <td>${parseFloat(trade.exit_price).toLocaleString()}</td>
                    <td className={pnl >= 0 ? 'text-success' : 'text-danger'}>
                      {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                    </td>
                    <td>{new Date(trade.closed_at).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default History