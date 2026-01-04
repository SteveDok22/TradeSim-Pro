import React, { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import './ChartModal.css'

const ChartModal = ({ symbol, isOpen, onClose }) => {
  const containerRef = useRef(null)

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
    if (!isOpen || !containerRef.current) return

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: getTradingViewSymbol(symbol),
      interval: '60',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com'
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [isOpen, symbol])

  if (!isOpen) return null

  return (
    <div className="chart-modal-overlay" onClick={onClose}>
      <div className="chart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="chart-modal-header">
          <h2>{symbol} Chart</h2>
          <button onClick={onClose} className="btn-close-modal">
            <FiX size={24} />
          </button>
        </div>
        <div className="chart-modal-body">
          <div 
            ref={containerRef} 
            className="tradingview-widget-container"
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartModal