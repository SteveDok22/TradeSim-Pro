import React, { useEffect, useRef } from 'react'

const TradingViewChart = ({ symbol, theme = 'dark' }) => {
  const containerRef = useRef(null)

  // Map our symbols to TradingView format
  const getTradingViewSymbol = (sym) => {
    const symbolMap = {
      'BTC': 'BINANCE:BTCUSDT',
      'ETH': 'BINANCE:ETHUSDT',
      'TSLA': 'NASDAQ:TSLA',
      'AAPL': 'NASDAQ:AAPL',
      'META': 'NASDAQ:META',
      'EURUSD': 'FX:EURUSD',
      'GBPUSD': 'FX:GBPUSD',
      'USDJPY': 'FX:USDJPY',
    }
    return symbolMap[sym] || `BINANCE:${sym}USDT`
  }

  useEffect(() => {
    if (!containerRef.current) return