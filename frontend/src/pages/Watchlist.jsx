import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { portfolioAPI } from '../api/portfolio'
import { tradingAPI } from '../api/trading'
import './Watchlist.css'

const Watchlist = () => {
  const navigate = useNavigate()
  const [watchlist, setWatchlist] = useState([])
  const [assets, setAssets] = useState([])
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState('')

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [watchlistData, assetsData, pricesData] = await Promise.all([
        portfolioAPI.getWatchlist(),
        tradingAPI.getAssets(),
        tradingAPI.getPrices()
      ])
      setWatchlist(watchlistData)
      setAssets(assetsData)
      
      const priceMap = {}
      pricesData.forEach(p => {
        priceMap[p.symbol] = p.price
      })
      setPrices(priceMap)
    } catch (error) {
      toast.error('Failed to load watchlist')
    } finally {
      setLoading(false)
    }
  }

  const fetchPrices = async () => {
    try {
      const pricesData = await tradingAPI.getPrices()
      const priceMap = {}
      pricesData.forEach(p => {
        priceMap[p.symbol] = p.price
      })
      setPrices(priceMap)
    } catch (error) {
      console.error('Error fetching prices:', error)
    }
  }

  const handleAdd = async () => {
    if (!selectedAsset) {
      toast.error('Please select an asset')
      return
    }

    setAdding(true)
    try {
      await portfolioAPI.addToWatchlist(parseInt(selectedAsset))
      toast.success('Added to watchlist! ⭐')
      setSelectedAsset('')
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add to watchlist')
    } finally {
      setAdding(false)
    }
  }

  const handleRemove = async (id, symbol) => {
    try {
      await portfolioAPI.removeFromWatchlist(id)
      toast.success(`${symbol} removed from watchlist`)
      fetchData()
    } catch (error) {
      toast.error('Failed to remove from watchlist')
    }
  }

  const handleTrade = (assetId) => {
    navigate(`/trade?asset=${assetId}`)
  }

  // Filter out assets already in watchlist
  const availableAssets = assets.filter(
    asset => !watchlist.some(w => w.asset.id === asset.id)
  )

  if (loading) {
    return <div className="loading">Loading watchlist...</div>
  } 

   return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <div>
          <h1>⭐ My Watchlist</h1>
          <p>Track your favorite assets</p>
        </div>
      </div>

      {/* Add to Watchlist */}
      <div className="add-watchlist-card">
        <h3>Add Asset to Watchlist</h3>
        <div className="add-form">
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
          >
            <option value="">Select an asset...</option>
            {availableAssets.map(asset => (
              <option key={asset.id} value={asset.id}>
                {asset.symbol} - {asset.name} ({asset.asset_type})
              </option>
            ))}
          </select>
          <button 
            onClick={handleAdd} 
            disabled={adding || !selectedAsset}
            className="btn-add"
          >
            {adding ? 'Adding...' : '+ Add'}
          </button>
        </div>
        {availableAssets.length === 0 && (
          <p className="no-assets-msg">All assets are already in your watchlist!</p>
        )}
      </div>