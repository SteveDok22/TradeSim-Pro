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

  const selectedAsset = assets.find(a => a.id === parseInt(formData.asset_id))
  const currentPrice = prices[formData.asset_id]
  const estimatedQuantity = formData.amount_usd && currentPrice 
    ? (parseFloat(formData.amount_usd) / parseFloat(currentPrice)).toFixed(8)
    : '0'

  if (loading) {
    return <div className="loading">Loading assets...</div>
  }

  return (
    <div className="trade-page">
      <div className="trade-header">
        <h1>Open New Trade</h1>
        <p>Available Balance: <span className="balance">${parseFloat(user?.account_balance || 0).toLocaleString()}</span></p>
      </div>

      <div className="trade-container">
        <form onSubmit={handleSubmit} className="trade-form">
          {/* Trade Type */}
          <div className="trade-type-selector">
            <button
              type="button"
              className={`type-btn buy ${formData.trade_type === 'BUY' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, trade_type: 'BUY' })}
            >
              📈 BUY
            </button>
            <button
              type="button"
              className={`type-btn sell ${formData.trade_type === 'SELL' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, trade_type: 'SELL' })}
            >
              📉 SELL
            </button>
          </div>

          {/* Asset Selection */}
          <div className="form-group">
            <label>Select Asset</label>
            <select
              name="asset_id"
              value={formData.asset_id}
              onChange={handleChange}
              required
            >
              <option value="">Choose an asset...</option>
              {assets.map(asset => (
                <option key={asset.id} value={asset.id}>
                  {asset.symbol} - {asset.name} ({asset.asset_type})
                </option>
              ))}
            </select>
          </div>
    
        </div>
      </div>
    </div>
  )
}

export default Trade