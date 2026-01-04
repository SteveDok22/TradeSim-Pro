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
