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
    
    def __init__(self, alpha_vantage_key=None):
        self.alpha_vantage_key = alpha_vantage_key
    
    def get_price(self, symbol):
        """
        Get price for a symbol. Uses cache to avoid rate limits.
        """
        # Check cache first
        cache_key = f'price_{symbol}'
        cached = cache.get(cache_key)
        if cached:
            return Decimal(str(cached))
        
        # Fetch from API
        price = None
        
        if symbol in self.BINANCE_SYMBOLS:
            price = self._fetch_binance(symbol)
        elif symbol in self.FOREX_PAIRS:
            price = self._fetch_forex(symbol)
        else:
            price = self._fetch_stock(symbol)
        
        # Cache the price
        if price:
            cache.set(cache_key, str(price), self.CACHE_TIMEOUT)
        
        return price