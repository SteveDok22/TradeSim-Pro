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