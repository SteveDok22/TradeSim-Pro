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
    
    def get_all_prices(self, assets):
        """
        Get prices for multiple assets.
        """
        prices = {}
        for asset in assets:
            try:
                prices[asset.symbol] = self.get_price(asset.symbol)
            except Exception as e:
                print(f'Error fetching {asset.symbol}: {e}')
                prices[asset.symbol] = None
        return prices
    
    def _fetch_binance(self, symbol):
        """Fetch crypto price from Binance."""
        try:
            api_symbol = self.BINANCE_SYMBOLS.get(symbol)
            response = requests.get(
                self.BINANCE_URL,
                params={'symbol': api_symbol},
                timeout=10
            )
            response.raise_for_status()
            data = response.json()
            return Decimal(data['price'])
        except Exception as e:
            print(f'Binance error for {symbol}: {e}')
            return None
        
    def _fetch_stock(self, symbol):
        """Fetch stock price from Alpha Vantage."""
        if not self.alpha_vantage_key:
            print('Alpha Vantage API key not set')
            return None
        
        try:
            response = requests.get(
                self.ALPHA_VANTAGE_URL,
                params={
                    'function': 'GLOBAL_QUOTE',
                    'symbol': symbol,
                    'apikey': self.alpha_vantage_key,
                },
                timeout=10
            )
            response.raise_for_status()
            data = response.json()
            
            quote = data.get('Global Quote', {})
            price = quote.get('05. price')
            
            if price:
                return Decimal(price)
            return None
        except Exception as e:
            print(f'Alpha Vantage error for {symbol}: {e}')
            return None    
        
    def _fetch_forex(self, symbol):
        """Fetch forex rate from Alpha Vantage."""
        if not self.alpha_vantage_key:
            print('Alpha Vantage API key not set')
            return None
        
        try:
            from_curr, to_curr = self.FOREX_PAIRS.get(symbol)
            response = requests.get(
                self.ALPHA_VANTAGE_URL,
                params={
                    'function': 'CURRENCY_EXCHANGE_RATE',
                    'from_currency': from_curr,
                    'to_currency': to_curr,
                    'apikey': self.alpha_vantage_key,
                },
                timeout=10
            )
            response.raise_for_status()
            data = response.json()
            
            rate_data = data.get('Realtime Currency Exchange Rate', {})
            rate = rate_data.get('5. Exchange Rate')
            
            if rate:
                return Decimal(rate)
            return None
        except Exception as e:
            print(f'Alpha Vantage forex error for {symbol}: {e}')
            return None    