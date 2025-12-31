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