import api from './axios'

export const tradingAPI = {
  getAssets: async () => {
    const response = await api.get('/trading/assets/')
    return response.data
  },

   getPrices: async () => {
    const response = await api.get('/trading/prices/')
    return response.data
  },

  openTrade: async (tradeData) => {
    const response = await api.post('/trading/trades/open/', tradeData)
    return response.data
  },

  closeTrade: async (tradeId) => {
    const response = await api.post('/trading/trades/close/', { trade_id: tradeId })
    return response.data
  },

  getOpenPositions: async () => {
    const response = await api.get('/trading/trades/positions/')
    return response.data
  },

  getTradeHistory: async () => {
    const response = await api.get('/trading/trades/history/')
    return response.data
  },
}