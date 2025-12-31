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