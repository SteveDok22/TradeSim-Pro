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

  const fetchPrice = async (assetId) => {
    const asset = assets.find(a => a.id === parseInt(assetId))
    if (asset) {
      try {
        const data = await tradingAPI.getPrices()
        const priceMap = {}
        data.forEach(p => {
          priceMap[p.id] = p.price
        })
        setPrices(priceMap)
      } catch (error) {
        console.error('Error fetching price:', error)
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.asset_id || !formData.amount_usd) {
      toast.error('Please fill all fields')
      return
    }

    const amount = parseFloat(formData.amount_usd)
    if (amount < 1) {
      toast.error('Minimum trade amount is $1')
      return
    }

    if (amount > parseFloat(user.account_balance)) {
      toast.error('Insufficient balance!')
      return
    }

    setSubmitting(true)

    try {
      const response = await tradingAPI.openTrade({
        asset_id: parseInt(formData.asset_id),
        amount_usd: amount,
        trade_type: formData.trade_type
      })
      
      updateBalance(response.new_balance)
      toast.success(`Trade opened! ${formData.trade_type} order placed 🚀`)
      navigate('/positions')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to open trade')
    } finally {
      setSubmitting(false)
    }
  }