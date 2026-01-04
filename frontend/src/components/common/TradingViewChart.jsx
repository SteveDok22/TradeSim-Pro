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

    // Clear previous widget
    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol: getTradingViewSymbol(symbol),
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '1D',
      colorTheme: theme,
      isTransparent: true,
      autosize: true,
      largeChartUrl: '',
      noTimeScale: false,
      chartOnly: false
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [symbol, theme])

  return (
    <div 
      ref={containerRef} 
      className="tradingview-widget-container"
      style={{ height: '150px', width: '100%' }}
    />
  )
}

export default TradingViewChart