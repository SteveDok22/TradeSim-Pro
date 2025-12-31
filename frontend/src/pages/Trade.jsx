import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { tradingAPI } from '../api/trading'
import './Trade.css'

const Trade = () => {
  const { user, updateBalance } = useAuth()
  const navigate = useNavigate()
  const [assets, setAssets] = useState([])
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    asset_id: '',
    amount_usd: '',
    trade_type: 'BUY'
  })

  useEffect(() => {
    fetchAssets()
  }, [])

  useEffect(() => {
    if (formData.asset_id) {
      fetchPrice(formData.asset_id)
    }
  }, [formData.asset_id])

  const fetchAssets = async () => {
    try {
      const [assetsData, pricesData] = await Promise.all([
        tradingAPI.getAssets(),
        tradingAPI.getPrices()
      ])
      setAssets(assetsData)
      
      const priceMap = {}
      pricesData.forEach(p => {
        priceMap[p.id] = p.price
      })
      setPrices(priceMap)
    } catch (error) {
      toast.error('Failed to load assets')
    } finally {
      setLoading(false)
    }
  }

  