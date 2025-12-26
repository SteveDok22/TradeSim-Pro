import api from './axios'

export const tradingAPI = {
  getAssets: async () => {
    const response = await api.get('/trading/assets/')
    return response.data
  },