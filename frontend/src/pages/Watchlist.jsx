import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { portfolioAPI } from '../api/portfolio'
import { tradingAPI } from '../api/trading'
import { FiStar, FiPlus, FiX, FiTrendingUp } from 'react-icons/fi'
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
      toast.success('Added to watchlist!')
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

  const availableAssets = assets.filter(
    asset => !watchlist.some(w => w.asset.id === asset.id)
  )

  if (loading) {
    return <div className="loading">Loading watchlist...</div>
  }

  return (
    <div className="watchlist-page">
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
        <div className="watchlist-header">
          <div>
            <h1><FiStar /> My Watchlist</h1>
            <p>Track your favorite assets</p>
          </div>
        </div>

        {/* Add to Watchlist */}
        <div className="add-watchlist-card">
          <h3><FiPlus /> Add Asset to Watchlist</h3>
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
              {adding ? 'Adding...' : <><FiPlus /> Add</>}
            </button>
          </div>
          {availableAssets.length === 0 && (
            <p className="no-assets-msg">All assets are already in your watchlist!</p>
          )}
        </div>

        {/* Watchlist Items */}
        {watchlist.length === 0 ? (
          <div className="empty-watchlist">
            <span className="icon">
              <FiStar />
            </span>
            <h2>Your Watchlist is Empty</h2>
            <p>Add assets above to start tracking them</p>
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map(item => {
              const currentPrice = prices[item.asset.symbol]
              return (
                <div key={item.id} className="watchlist-card">
                  <div className="card-header">
                    <div className="asset-info">
                      <h3>{item.asset.symbol}</h3>
                      <span className={`asset-type ${item.asset.asset_type.toLowerCase()}`}>
                        {item.asset.asset_type}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id, item.asset.symbol)}
                      className="btn-remove"
                      title="Remove from watchlist"
                    >
                      <FiX />
                    </button>
                  </div>
                  
                  <p className="asset-name">{item.asset.name}</p>
                  
                  <div className="price-section">
                    <span className="label">Current Price</span>
                    <p className="price">
                      {currentPrice 
                        ? `$${parseFloat(currentPrice).toLocaleString()}`
                        : 'Loading...'
                      }
                    </p>
                  </div>

                  <div className="card-actions">
                    <button 
                      onClick={() => handleTrade(item.asset.id)}
                      className="btn-trade"
                    >
                      <FiTrendingUp /> Trade Now
                    </button>
                  </div>

                  <p className="added-date">
                    Added: {new Date(item.added_at).toLocaleDateString()}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Watchlist