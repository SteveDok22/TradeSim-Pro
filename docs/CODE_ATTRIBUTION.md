# Code Attribution & Resources

This section provides comprehensive documentation of all external code, libraries, patterns, and resources used in this project. All code has been properly attributed, understood, adapted, and integrated according to licensing requirements.

---

## Core Frameworks & Libraries

### Django (v5.0.1) - Backend Framework
- **Source:** [Django Documentation](https://docs.djangoproject.com/)
- **License:** BSD 3-Clause License
- **Usage:** Core backend framework for the entire project

#### Code Adaptations:
```python
# Custom User Model pattern from Django documentation
# Used in accounts/models.py lines 1-45
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    account_balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal('10000.00')
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
```
- **Reference:** [Substituting a Custom User Model](https://docs.djangoproject.com/en/5.0/topics/auth/customizing/#substituting-a-custom-user-model)
```python
# DecimalField for financial data from Django documentation
# Used in all models for monetary values
account_balance = models.DecimalField(
    max_digits=12,
    decimal_places=2,
    default=Decimal('10000.00')
)
```
- **Reference:** [Django DecimalField](https://docs.djangoproject.com/en/5.0/ref/models/fields/#decimalfield)
```python
# Model choices pattern from Django documentation
# Used in trading/models.py lines 10-25
ASSET_TYPES = [
    ('CRYPTO', 'Cryptocurrency'),
    ('STOCK', 'Stock'),
    ('FOREX', 'Forex'),
]
asset_type = models.CharField(max_length=10, choices=ASSET_TYPES)
```
- **Reference:** [Django Field Choices](https://docs.djangoproject.com/en/5.0/ref/models/fields/#choices)
```python
# ForeignKey relationships from Django documentation
# Used in trading/models.py lines 40-50
user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='trades'
)
```
- **Reference:** [Django ForeignKey](https://docs.djangoproject.com/en/5.0/ref/models/fields/#foreignkey)
```python
# OneToOneField for Portfolio from Django documentation
# Used in portfolio/models.py lines 10-15
user = models.OneToOneField(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='portfolio'
)
```
- **Reference:** [Django OneToOneField](https://docs.djangoproject.com/en/5.0/ref/models/fields/#onetoonefield)

---

### Django REST Framework (v3.14.0) - API Development
- **Source:** [DRF Documentation](https://www.django-rest-framework.org/)
- **License:** BSD 3-Clause License
- **Usage:** RESTful API endpoints

#### Code Adaptations:
```python
# ModelSerializer pattern from DRF documentation
# Used in accounts/serializers.py lines 8-20
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'account_balance']
        read_only_fields = ['id', 'account_balance']
```
- **Reference:** [DRF Serializers](https://www.django-rest-framework.org/api-guide/serializers/#modelserializer)
```python
# SerializerMethodField from DRF documentation
# Used in accounts/serializers.py lines 35-45
formatted_balance = serializers.SerializerMethodField()

def get_formatted_balance(self, obj):
    return f'${obj.account_balance:,.2f}'
```

- **Reference:** [DRF SerializerMethodField](https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield)
```python
# Password validation in serializer from DRF examples
# Used in accounts/serializers.py lines 15-30
def validate(self, data):
    if data['password'] != data['password_confirm']:
        raise serializers.ValidationError({
            'password_confirm': 'Passwords do not match.'
        })
    return data
```
- **Reference:** [DRF Validators](https://www.django-rest-framework.org/api-guide/validators/)
```python
# Generic views pattern from DRF documentation
# Used in accounts/views.py lines 15-25
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
```
- **Reference:** [DRF Generic Views](https://www.django-rest-framework.org/api-guide/generic-views/)
```python
# APIView pattern from DRF documentation
# Used in trading/views.py lines 30-60
class PriceListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        # Implementation
        return Response(data)
```
- **Reference:** [DRF APIView](https://www.django-rest-framework.org/api-guide/views/#class-based-views)
```python
# Permission classes from DRF documentation
# Used throughout views.py files
permission_classes = [IsAuthenticated]
```
- **Reference:** [DRF Permissions](https://www.django-rest-framework.org/api-guide/permissions/)

---

### Simple JWT (v5.3.1) - JWT Authentication
- **Source:** [SimpleJWT Documentation](https://django-rest-framework-simplejwt.readthedocs.io/)
- **License:** MIT License
- **Usage:** Token-based authentication

#### Code Adaptations:
```python
# JWT token generation from SimpleJWT documentation
# Used in accounts/views.py lines 25-35
from rest_framework_simplejwt.tokens import RefreshToken

refresh = RefreshToken.for_user(user)
return Response({
    'tokens': {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
})
```
- **Reference:** [SimpleJWT Creating Tokens Manually](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/creating_tokens_manually.html)
```python
# JWT settings configuration from SimpleJWT documentation
# Used in tradesim/settings.py lines 85-95
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}
```
- **Reference:** [SimpleJWT Settings](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html)
```python
# Token blacklist for logout from SimpleJWT documentation
# Used in accounts/views.py lines 70-80
from rest_framework_simplejwt.tokens import RefreshToken

def post(self, request):
    refresh_token = request.data.get('refresh')
    token = RefreshToken(refresh_token)
    token.blacklist()
```
- **Reference:** [SimpleJWT Blacklist App](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/blacklist_app.html)

---

### Django CORS Headers (v4.3.1)
- **Source:** [django-cors-headers Documentation](https://github.com/adamchainz/django-cors-headers)
- **License:** MIT License
- **Usage:** Cross-Origin Resource Sharing

#### Code Adaptations:
```python
# CORS configuration from documentation
# Used in tradesim/settings.py lines 100-105
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
CORS_ALLOW_CREDENTIALS = True
```
- **Reference:** [django-cors-headers Configuration](https://github.com/adamchainz/django-cors-headers#configuration)

---

### Requests (v2.31.0) - HTTP Library
- **Source:** [Requests Documentation](https://requests.readthedocs.io/)
- **License:** Apache License 2.0
- **Usage:** External API calls to Binance and Alpha Vantage

#### Code Adaptations:
```python
# HTTP GET request pattern from Requests documentation
# Used in trading/services/price_service.py lines 55-70
response = requests.get(
    self.BINANCE_URL,
    params={'symbol': api_symbol},
    timeout=10
)
response.raise_for_status()
data = response.json()
```
- **Reference:** [Requests Quickstart](https://requests.readthedocs.io/en/latest/user/quickstart/)
```python
# Error handling for HTTP requests from Requests documentation
# Used in trading/services/price_service.py lines 45-55
try:
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
except requests.RequestException as e:
    print(f'API error: {e}')
    return None
```
- **Reference:** [Requests Exceptions](https://requests.readthedocs.io/en/latest/user/quickstart/#errors-and-exceptions)

---

### Django Cache Framework
- **Source:** [Django Cache Documentation](https://docs.djangoproject.com/en/5.0/topics/cache/)
- **License:** BSD 3-Clause License
- **Usage:** Price caching to avoid API rate limits

#### Code Adaptations:
```python
# Cache get/set pattern from Django documentation
# Used in trading/services/price_service.py lines 30-45
from django.core.cache import cache

# Check cache first
cache_key = f'price_{symbol}'
cached = cache.get(cache_key)
if cached:
    return Decimal(str(cached))

# Fetch and cache
price = self._fetch_price(symbol)
if price:
    cache.set(cache_key, str(price), self.CACHE_TIMEOUT)
```
- **Reference:** [Django Cache Framework](https://docs.djangoproject.com/en/5.0/topics/cache/#the-low-level-cache-api)

---

## Frontend Libraries

### React (v18.2.0) - UI Framework
- **Source:** [React Documentation](https://react.dev/)
- **License:** MIT License
- **Usage:** Frontend user interface

### React Router DOM (v6.21.0) - Routing
- **Source:** [React Router Documentation](https://reactrouter.com/)
- **License:** MIT License
- **Usage:** Client-side routing

#### Code Adaptations:
```jsx
// Protected Route pattern from React Router documentation
// Used in frontend/src/App.jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return <div className="loading">Loading...</div>
  return isAuthenticated ? children : <Navigate to="/login" />
}
```
- **Reference:** [React Router Auth Example](https://reactrouter.com/en/main/start/examples)

### Axios (v1.6.2) - HTTP Client
- **Source:** [Axios Documentation](https://axios-http.com/)
- **License:** MIT License
- **Usage:** API requests to Django backend

#### Code Adaptations:
```javascript
// Axios interceptors pattern from documentation
// Used in frontend/src/api/axios.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```
- **Reference:** [Axios Interceptors](https://axios-http.com/docs/interceptors)

### React Toastify (v9.1.3) - Notifications
- **Source:** [React Toastify Documentation](https://fkhadra.github.io/react-toastify/)
- **License:** MIT License
- **Usage:** User feedback notifications

#### Code Adaptations:
```jsx
// Toast notifications from React Toastify documentation
// Used throughout frontend pages
import { toast } from 'react-toastify'

toast.success('Trade opened successfully! 🚀')
toast.error('Insufficient balance!')
```
- **Reference:** [React Toastify Usage](https://fkhadra.github.io/react-toastify/introduction)

### Vite (v5.0.10) - Build Tool
- **Source:** [Vite Documentation](https://vitejs.dev/)
- **License:** MIT License
- **Usage:** Frontend build and development server

#### Code Adaptations:
```javascript
// Vite config from documentation
// Used in frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```
- **Reference:** [Vite Config](https://vitejs.dev/config/)

---

### React Context API - State Management
- **Source:** [React Context Documentation](https://react.dev/learn/passing-data-deeply-with-context)
- **License:** MIT License
- **Usage:** Global authentication state

#### Code Adaptations:
```jsx
// Auth Context pattern from React documentation
// Used in frontend/src/context/AuthContext.jsx
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  
  return (
    
      {children}
    
  )
}

export const useAuth = () => useContext(AuthContext)
```
- **Reference:** [React useContext](https://react.dev/reference/react/useContext)

---

## External APIs

### Binance API - Cryptocurrency Prices
- **Source:** [Binance API Documentation](https://binance-docs.github.io/apidocs/)
- **License:** Free for public endpoints
- **Usage:** Real-time BTC and ETH prices

#### Code Adaptations:
```python
# Binance ticker price endpoint from API documentation
# Used in trading/services/price_service.py lines 50-65
BINANCE_URL = 'https://api.binance.com/api/v3/ticker/price'

def _fetch_binance(self, symbol):
    api_symbol = self.BINANCE_SYMBOLS.get(symbol)  # BTC -> BTCUSDT
    response = requests.get(
        self.BINANCE_URL,
        params={'symbol': api_symbol}
    )
    data = response.json()
    return Decimal(data['price'])
```
- **Reference:** [Binance Symbol Price Ticker](https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker)

---

### Alpha Vantage API - Stock & Forex Prices
- **Source:** [Alpha Vantage Documentation](https://www.alphavantage.co/documentation/)
- **License:** Free tier with API key
- **Usage:** Stock quotes (TSLA, AAPL) and forex rates (EURUSD, GBPUSD, JPYUSD)

#### Code Adaptations:
```python
# Stock quote endpoint from Alpha Vantage documentation
# Used in trading/services/price_service.py lines 70-90
ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query'

def _fetch_stock(self, symbol):
    response = requests.get(
        self.ALPHA_VANTAGE_URL,
        params={
            'function': 'GLOBAL_QUOTE',
            'symbol': symbol,
            'apikey': self.alpha_vantage_key,
        }
    )
    data = response.json()
    quote = data.get('Global Quote', {})
    price = quote.get('05. price')
    return Decimal(price) if price else None
```
- **Reference:** [Alpha Vantage GLOBAL_QUOTE](https://www.alphavantage.co/documentation/#latestprice)
```python
# Forex exchange rate endpoint from Alpha Vantage documentation
# Used in trading/services/price_service.py lines 95-115
def _fetch_forex(self, symbol):
    from_curr, to_curr = self.FOREX_PAIRS.get(symbol)
    response = requests.get(
        self.ALPHA_VANTAGE_URL,
        params={
            'function': 'CURRENCY_EXCHANGE_RATE',
            'from_currency': from_curr,
            'to_currency': to_curr,
            'apikey': self.alpha_vantage_key,
        }
    )
    data = response.json()
    rate_data = data.get('Realtime Currency Exchange Rate', {})
    rate = rate_data.get('5. Exchange Rate')
    return Decimal(rate) if rate else None
```
- **Reference:** [Alpha Vantage CURRENCY_EXCHANGE_RATE](https://www.alphavantage.co/documentation/#currency-exchange)

---

## Python Standard Library

### Decimal Module - Financial Calculations
- **Source:** [Python Decimal Documentation](https://docs.python.org/3/library/decimal.html)
- **License:** PSF License
- **Usage:** Precise financial calculations

#### Code Adaptations:
```python
# Decimal for monetary values from Python documentation
# Used throughout all models and services
from decimal import Decimal

account_balance = Decimal('10000.00')
quantity = amount_usd / current_price
pnl = (exit_price - entry_price) * quantity
```
- **Reference:** [Python Decimal Module](https://docs.python.org/3/library/decimal.html)

---

### datetime Module - Timestamps
- **Source:** [Python datetime Documentation](https://docs.python.org/3/library/datetime.html)
- **License:** PSF License
- **Usage:** Trade timestamps

#### Code Adaptations:
```python
# Timezone-aware datetime from Django documentation
# Used in trading/models.py lines 85-90
from django.utils import timezone

def close_trade(self, exit_price):
    self.closed_at = timezone.now()
    self.save()
```
- **Reference:** [Django Timezone](https://docs.djangoproject.com/en/5.0/topics/i18n/timezones/)

---

## Design Patterns & Best Practices

### Service Layer Pattern
- **Source:** [Django Design Patterns](https://django-design-patterns.readthedocs.io/)
- **Inspiration:** Separation of business logic from views

#### Code Adaptations:
```python
# Service class pattern for business logic
# Used in trading/services/price_service.py
class PriceService:
    """Service for fetching prices from external APIs."""
    
    def __init__(self, alpha_vantage_key=None):
        self.alpha_vantage_key = alpha_vantage_key
    
    def get_price(self, symbol):
        """Get price for a symbol."""
        # Implementation...
    
    def get_all_prices(self, assets):
        """Get prices for multiple assets."""
        # Implementation...

# Singleton instance
price_service = PriceService()
```
- **Reference:** [Service Layer Pattern](https://www.cosmicpython.com/book/chapter_04_service_layer.html)

---

### PnL Calculation Pattern
- **Source:** [Investopedia - How to Calculate Profit and Loss](https://www.investopedia.com/articles/investing/062113/how-calculate-profitloss-options.asp)
- **Inspiration:** Standard trading PnL formulas

#### Code Adaptations:
```python
# PnL calculation from standard trading formulas
# Used in trading/models.py lines 70-85
def calculate_pnl(self, current_price):
    """Calculate profit/loss based on current price."""
    current_price = Decimal(str(current_price))
    
    if self.trade_type == 'BUY':
        # Long position: profit when price goes up
        price_diff = current_price - self.entry_price
    else:
        # Short position: profit when price goes down
        price_diff = self.entry_price - current_price
    
    pnl_amount = price_diff * self.quantity
    pnl_percent = (price_diff / self.entry_price) * 100
    
    return (round(pnl_amount, 2), round(pnl_percent, 2))
```
- **Reference:** [Investopedia P&L](https://www.investopedia.com/terms/p/plstatement.asp)

---

## Community Resources & Tutorials

### Django REST Framework Tutorial
- **Source:** [DRF Quickstart Tutorial](https://www.django-rest-framework.org/tutorial/quickstart/)
- **License:** BSD 3-Clause
- **Usage:** Overall API structure and patterns

### JWT.io - JWT Understanding
- **Source:** [JWT Introduction](https://jwt.io/introduction)
- **Usage:** Understanding JWT token structure and flow

### Stack Overflow Solutions

#### Currency Formatting Pattern
- **Source:** [Stack Overflow - Python Currency Formatting](https://stackoverflow.com/questions/320929/currency-formatting-in-python)
- **License:** CC BY-SA 4.0
```python
# Currency formatting adapted from Stack Overflow
# Used in accounts/serializers.py
def get_formatted_balance(self, obj):
    return f'${obj.account_balance:,.2f}'
```

#### Safe Dictionary Access
- **Source:** [Stack Overflow - Python Dict Get](https://stackoverflow.com/questions/11041405/why-dict-getkey-instead-of-dictkey)
- **License:** CC BY-SA 4.0
```python
# Safe dictionary access from Stack Overflow patterns
# Used in trading/services/price_service.py
quote = data.get('Global Quote', {})
price = quote.get('05. price')
```

---

## Project Inspiration

### Code Institute PP4 Examples
- **Source:** Code Institute Learning Materials
- **Usage:** Project structure and assessment criteria understanding

### I Think Therefore I Blog
- **Source:** Code Institute Django Blog Walkthrough
- **Usage:** Django project setup patterns and authentication flow

---

## Deployment & Infrastructure

### dj-database-url (v2.1.0)
- **Source:** [dj-database-url Documentation](https://github.com/jazzband/dj-database-url)
- **License:** BSD 2-Clause License
- **Usage:** Parse DATABASE_URL for Heroku PostgreSQL

#### Code Adaptations:
```python
# Database URL parsing from dj-database-url documentation
# Used in tradesim/settings.py lines 55-70
import dj_database_url

DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=True,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
```
- **Reference:** [dj-database-url Usage](https://github.com/jazzband/dj-database-url#usage)

---

### Gunicorn (v21.2.0)
- **Source:** [Gunicorn Documentation](https://gunicorn.org/)
- **License:** MIT License
- **Usage:** Production WSGI HTTP server for Heroku

#### Code Adaptations:
```
# Procfile for Heroku deployment
web: cd backend && gunicorn tradesim.wsgi:application
```
- **Reference:** [Gunicorn Django Deployment](https://docs.gunicorn.org/en/stable/deploy.html)

---

### WhiteNoise (v6.6.0)
- **Source:** [WhiteNoise Documentation](http://whitenoise.evans.io/)
- **License:** MIT License
- **Usage:** Serve static files in production

#### Code Adaptations:
```python
# WhiteNoise configuration from documentation
# Used in tradesim/settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add after SecurityMiddleware
    ...
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```
- **Reference:** [WhiteNoise Django Guide](http://whitenoise.evans.io/en/stable/django.html)

---

### Heroku Platform
- **Source:** [Heroku Dev Center](https://devcenter.heroku.com/)
- **License:** Proprietary (Free tier used)
- **Usage:** Cloud application hosting

#### Configuration:
- Deployment via GitHub integration (Heroku Dashboard)
- PostgreSQL database via Heroku Postgres add-on
- Environment variables via Config Vars
- Python buildpack for Django application

- **Reference:** [Heroku Python Support](https://devcenter.heroku.com/articles/python-support)

---

## Tools Used

| Tool | Purpose | Link |
|------|---------|------|
| VS Code | Code editor | [VS Code](https://code.visualstudio.com/) |
| Postman | API testing | [Postman](https://www.postman.com/) |
| Git | Version control | [Git](https://git-scm.com/) |
| GitHub | Repository hosting | [GitHub](https://github.com/) |
| GitHub Projects | Agile management | [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects) |
| Heroku | Cloud deployment | [Heroku](https://www.heroku.com/) |
| Draw.io | Flowcharts & ERD | [Draw.io](https://app.diagrams.net/) |
| PostgreSQL | Production database | [PostgreSQL](https://www.postgresql.org/) |

---

## License Compliance Summary

| Library | License | Commercial Use | Modification | Distribution |
|---------|---------|----------------|--------------|--------------|
| Django | BSD 3-Clause | ✅ | ✅ | ✅ |
| DRF | BSD 3-Clause | ✅ | ✅ | ✅ |
| SimpleJWT | MIT | ✅ | ✅ | ✅ |
| Requests | Apache 2.0 | ✅ | ✅ | ✅ |
| django-cors-headers | MIT | ✅ | ✅ | ✅ |
| Gunicorn | MIT | ✅ | ✅ | ✅ |
| Whitenoise | MIT | ✅ | ✅ | ✅ |
| psycopg2 | LGPL | ✅ | ✅ | ✅ |

All libraries used in this project are open-source and permit commercial use, modification, and distribution.

---