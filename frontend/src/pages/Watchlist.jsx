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

 }

  // Filter out assets already in watchlist
  const availableAssets = assets.filter(
    asset => !watchlist.some(w => w.asset.id === asset.id)
  )

  if (loading) {
    return <div className="loading">Loading watchlist...</div>
  }