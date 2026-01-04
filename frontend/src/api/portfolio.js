import api from './axios'

export const portfolioAPI = {
  getPortfolio: async () => {
    const response = await api.get('/portfolio/')
    return response.data
  },

  getSummary: async () => {
    const response = await api.get('/portfolio/summary/')
    return response.data
  },

  getWatchlist: async () => {
    const response = await api.get('/portfolio/watchlist/')
    return response.data
  },

  addToWatchlist: async (assetId) => {
    const response = await api.post('/portfolio/watchlist/add/', { asset_id: assetId })
    return response.data
  },

  removeFromWatchlist: async (id) => {
    const response = await api.delete(`/portfolio/watchlist/${id}/`)
    return response.data
  },
}