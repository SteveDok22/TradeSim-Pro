import requests
from decimal import Decimal
from django.core.cache import cache


class PriceService:
    """
    Service for fetching prices from Binance and Alpha Vantage.
    """
    
    BINANCE_URL = 'https://api.binance.com/api/v3/ticker/price'
    ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query'
    
    # Cache timeout (30 seconds)
    CACHE_TIMEOUT = 30
    
    # Symbol mapping for APIs
    BINANCE_SYMBOLS = {
        'BTC': 'BTCUSDT',
        'ETH': 'ETHUSDT',
    }
    
    FOREX_PAIRS = {
        'EURUSD': ('EUR', 'USD'),
        'GBPUSD': ('GBP', 'USD'),
        'JPYUSD': ('JPY', 'USD'),
    }