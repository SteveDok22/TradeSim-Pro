# TradeSim Pro - Prop Trading Simulator

![Am I Responsive](docs\screenshots\responsive-mockup.gif)

**Live Site:** [TradeSim Pro on Heroku](https://tradesim-pro-stiven-62203fadbb77.herokuapp.com)

**Repository:** [GitHub](https://github.com/SteveDok22/tradesim-pro)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [UX Design](#ux-design)
   - [Strategy](#strategy)
   - [User Stories](#user-stories)
   - [Wireframes](#wireframes)
   - [Design Choices](#design-choices)
3. [Features](#features)
   - [Existing Features](#existing-features)
   - [Future Features](#future-features)
4. [Database Design](#database-design)
   - [Entity Relationship Diagram](#entity-relationship-diagram)
   - [Models](#models)
5. [Technologies Used](#technologies-used)
6. [Agile Methodology](#agile-methodology)
7. [Testing](#testing)
   - [Automated Testing](#automated-testing)
   - [Manual Testing](#manual-testing)
   - [Validator Testing](#validator-testing)
   - [Bugs](#bugs)
8. [Deployment](#deployment)
   - [Heroku Deployment](#heroku-deployment)
   - [Local Development](#local-development)
   - [Forking Repository](#forking-the-repository)
   - [Cloning Repository](#cloning-the-repository)
9. [Credits](#credits)

---

## Project Overview

### Purpose

TradeSim Pro is a comprehensive prop trading simulator designed for beginner traders who want to practice trading cryptocurrencies, stocks, and forex pairs in a completely risk-free environment. The platform provides real-time market data, portfolio tracking, and performance analytics to help users develop their trading skills without risking real money.

### Target Audience

- **Beginner Traders:** Individuals new to trading who want to learn market dynamics
- **Finance Students:** Students studying finance, economics, or trading
- **Strategy Testers:** Traders wanting to test new strategies without financial risk
- **Educational Institutions:** Schools and courses teaching financial markets

### Value Proposition

- Practice trading with virtual $10,000 starting balance
- Real-time prices from Binance (crypto) and Alpha Vantage (stocks/forex)
- Track performance with detailed statistics and charts
- Learn from mistakes without losing real money

### Application Flowchart

![Application Flowchart](docs\images\TradeSimProApplicationFlow.png)

---

### API Request Flowchart

![Application API Request Flowchart](docs\images\API-RequestFlow.png)

The flowchart above shows the main user journey through the application, from registration to trading operations.

---

## UX Design

### Strategy

#### Project Goals

| Goal | Description |
|------|-------------|
| Educational | Provide a safe environment for learning trading |
| Practical | Simulate real market conditions with live prices |
| Analytical | Offer insights through performance statistics |
| Accessible | Easy to use for complete beginners |

#### User Goals

| User Type | Goal |
|-----------|------|
| New Trader | Learn how to execute trades safely |
| Student | Understand market dynamics practically |
| Hobbyist | Test trading ideas without risk |

### User Stories

#### Epic 1: User Authentication

| ID | As a... | I want to... | So that I can... | Priority |
|----|---------|--------------|------------------|----------|
| 1.1 | New User | Register an account | Start trading with virtual money | Must Have |
| 1.2 | Registered User | Log in to my account | Access my portfolio and trades | Must Have |
| 1.3 | Logged-in User | Log out securely | Protect my account | Must Have |
| 1.4 | User | See my login status | Know if I'm logged in | Must Have |

#### Epic 2: Market Data

| ID | As a... | I want to... | So that I can... | Priority |
|----|---------|--------------|------------------|----------|
| 2.1 | Trader | See real-time crypto prices | Make informed trading decisions | Must Have |
| 2.2 | Trader | See stock prices | Trade popular stocks | Must Have |
| 2.3 | Trader | See forex rates | Trade currency pairs | Must Have |
| 2.4 | Trader | See prices update automatically | Have current market data | Should Have |

#### Epic 3: Trading

| ID | As a... | I want to... | So that I can... | Priority |
|----|---------|--------------|------------------|----------|
| 3.1 | Trader | Open a BUY position | Enter the market | Must Have |
| 3.2 | Trader | Close my position (SELL) | Exit and realize profit/loss | Must Have |
| 3.3 | Trader | View my open positions | Monitor current trades | Must Have |
| 3.4 | Trader | View trade history | Analyze past performance | Must Have |
| 3.5 | Trader | Set Stop-Loss | Limit potential losses | Should Have |
| 3.6 | Trader | Set Take-Profit | Secure profits automatically | Should Have |

#### Epic 4: Portfolio

| ID | As a... | I want to... | So that I can... | Priority |
|----|---------|--------------|------------------|----------|
| 4.1 | Trader | See my account balance | Know available capital | Must Have |
| 4.2 | Trader | See total PnL | Track overall performance | Must Have |
| 4.3 | Trader | See win rate | Evaluate trading success | Should Have |
| 4.4 | Trader | See performance chart | Visualize progress | Should Have |

#### Epic 5: Watchlist

| ID | As a... | I want to... | So that I can... | Priority |
|----|---------|--------------|------------------|----------|
| 5.1 | Trader | Add assets to watchlist | Track interesting assets | Should Have |
| 5.2 | Trader | Remove from watchlist | Keep list relevant | Should Have |

### Wireframes

#### Desktop Views

<details>
<summary>Landing Page</summary>

![Landing Page Wireframe](docs/wireframes/landing-desktop.png)

</details>

<details>
<summary>Dashboard</summary>

![Dashboard Wireframe](docs/wireframes/dashboard-desktop.png)

</details>

<details>
<summary>Trading View</summary>

![Trading Wireframe](docs/wireframes/trading-desktop.png)

</details>

#### Mobile Views

<details>
<summary>Mobile Landing</summary>

![Mobile Landing Wireframe](docs/wireframes/landing-mobile.png)

</details>

<details>
<summary>Mobile Dashboard</summary>

![Mobile Dashboard Wireframe](docs/wireframes/dashboard-mobile.png)

</details>

### Design Choices

#### Colour Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#2563EB` | Buttons, links, accents |
| Success Green | `#10B981` | Profit indicators, buy buttons |
| Danger Red | `#EF4444` | Loss indicators, sell buttons |
| Dark Background | `#1F2937` | Header, cards |
| Light Background | `#F9FAFB` | Page background |
| Text Primary | `#111827` | Main text |
| Text Secondary | `#6B7280` | Secondary text |

#### Typography

| Element | Font | Weight |
|---------|------|--------|
| Headings | Inter | 600-700 |
| Body | Inter | 400 |
| Numbers/Data | JetBrains Mono | 500 |

#### Design Rationale

- **Clean Interface:** Trading requires focus, so minimal distractions
- **Color-Coded Data:** Green/red for instant profit/loss recognition
- **Monospace Numbers:** Easier to read and compare financial data
- **Responsive Layout:** Trading on any device

---

## Features

### Existing Features

### Existing Features

#### F1: User Authentication

![Authentication Screenshot](docs/screenshots/login-desktop.png)

- Secure registration with email validation
- Login with JWT token authentication
- Password hashing with Django
- Session management

#### F2: Real-Time Market Data with TradingView Charts

![Dashboard Demo](docs/screenshots/dashboard-demo.gif)

- Live cryptocurrency prices (BTC, ETH) from Binance
- Stock quotes (TSLA, META, AAPL) from Alpha Vantage
- Forex rates (GBPUSD, EURUSD, USDJPY) from Alpha Vantage
- **TradingView mini charts** for each asset
- **Full TradingView chart modal** on click
- Auto-refresh every 30 seconds

#### F3: Trading Simulator

![Trading Demo](docs/screenshots/trade-demo.gif)

- Open BUY/SELL positions with one click
- Real-time price display
- Quick amount buttons ($100, $500, $1000, $5000)
- Trade summary before execution
- Live prices sidebar
- **Video background** for immersive experience

#### F4: Portfolio Dashboard

![Dashboard Screenshot](docs\screenshots\dashboard-demo.gif)

- Real-time account balance
- Total unrealized PnL calculation
- Open positions count
- Trading tier display
- **Reset Balance** button to restart with $10,000
- Quick action buttons

#### F5: Positions Management

![Positions Demo](docs/screenshots/positions-demo.gif)

- View all open positions
- Real-time PnL updates
- Close positions with one click
- Position details (entry price, current price, quantity)
- Total unrealized PnL summary

#### F6: Watchlist

![Watchlist Demo](docs/screenshots/watchlist-demo.gif)

- Add/remove favorite assets
- Quick access to watched prices
- One-click trade from watchlist
- Asset type badges (Crypto, Stock, Forex)

#### F7: Mobile Responsive Design

![Mobile Demo](docs\screenshots\mobile-demo1.gif) ![Mobile Demo](docs\screenshots\mobile-demo2.gif)

- Fully responsive on all devices
- **Hamburger menu** for mobile navigation
- Touch-friendly interface
- Optimized layouts for small screens

#### F8: Video Backgrounds

- Dynamic video backgrounds on key pages:
  - Home page - Trading animation
  - Login/Register - Chart visualization
  - Trade page - Market data animation
  - Positions/Watchlist - Trading theme

#### F9: Professional UI with React Icons

- **Feather/Lucide icons** throughout the app
- Clean, modern FinTech aesthetic
- TradingView-inspired design
- Consistent visual language

![Toast Screenshot](docs\screenshots\notification.png)

- Success notifications on actions
- Error messages for validation
- Confirmation dialogs for critical actions
- Loading indicators

### Future Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Trade Journal | Notes and emotions per trade | Medium |
| Paper Trading Leagues | Compete with other users | Low |
| Advanced Charts | TradingView integration | Medium |
| Mobile App | Native iOS/Android app | Low |
| Email Alerts | Price alert notifications | Medium |

---

## Database Design

### Entity Relationship Diagram

![ERD Diagram](docs\images\ERD-Diagram.png)

### Models

#### CustomUser Model

| Field | Type | Description |
|-------|------|-------------|
| id | AutoField | Primary key |
| username | CharField | Unique username |
| email | EmailField | Unique email (used for login) |
| password | CharField | Hashed password |
| account_balance | DecimalField | Virtual balance (default: $10,000) |
| trading_tier | CharField | BASIC, PRO, MASTER |
| bio | TextField | Optional user bio |
| date_joined | DateTimeField | Registration date |

#### Asset Model

| Field | Type | Description |
|-------|------|-------------|
| id | AutoField | Primary key |
| symbol | CharField | Trading symbol (BTC, TSLA, EURUSD) |
| name | CharField | Full name |
| asset_type | CharField | CRYPTO, STOCK, FOREX |
| api_source | CharField | BINANCE, ALPHAVANTAGE |
| is_active | BooleanField | Available for trading |

#### Trade Model

| Field | Type | Description |
|-------|------|-------------|
| id | AutoField | Primary key |
| user | ForeignKey | Link to CustomUser |
| asset | ForeignKey | Link to Asset |
| trade_type | CharField | BUY or SELL |
| quantity | DecimalField | Amount traded |
| entry_price | DecimalField | Price at open |
| exit_price | DecimalField | Price at close (nullable) |
| stop_loss | DecimalField | Stop-loss price (nullable) |
| take_profit | DecimalField | Take-profit price (nullable) |
| pnl | DecimalField | Profit/Loss (nullable) |
| pnl_percent | DecimalField | PnL percentage |
| status | CharField | OPEN or CLOSED |
| opened_at | DateTimeField | Trade open time |
| closed_at | DateTimeField | Trade close time (nullable) |

#### Portfolio Model

| Field | Type | Description |
|-------|------|-------------|
| id | AutoField | Primary key |
| user | OneToOneField | Link to CustomUser |
| total_pnl | DecimalField | All-time realized PnL |
| total_pnl_percent | DecimalField | PnL percentage |
| win_rate | DecimalField | Winning trade percentage |
| total_trades | IntegerField | Total closed trades |
| winning_trades | IntegerField | Winning trades count |
| losing_trades | IntegerField | Losing trades count |
| updated_at | DateTimeField | Last update |

#### Watchlist Model

| Field | Type | Description |
|-------|------|-------------|
| id | AutoField | Primary key |
| user | ForeignKey | Link to CustomUser |
| asset | ForeignKey | Link to Asset |
| added_at | DateTimeField | Date added |

---

## Technologies Used

### Languages

- Python 3.12
- JavaScript (ES6+)
- HTML5
- CSS3

### Frameworks & Libraries

#### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Django | 5.0.1 | Backend framework |
| Django REST Framework | 3.14.0 | API development |
| Simple JWT | 5.3.1 | JWT authentication |
| django-cors-headers | 4.3.1 | CORS handling |
| django-allauth | 0.60.1 | User authentication |
| dj-rest-auth | 5.0.2 | REST authentication |
| psycopg2-binary | 2.9.9 | PostgreSQL adapter |
| dj-database-url | 2.1.0 | Database configuration |
| gunicorn | 21.2.0 | WSGI server |
| whitenoise | 6.6.0 | Static files |
| requests | 2.31.0 | HTTP requests |

#### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| React Router DOM | 6.21.0 | Client-side routing |
| Axios | 1.6.2 | HTTP client |
| React Toastify | 9.1.3 | Toast notifications |
| React Icons | 5.0.1 | Professional icons (Feather/Lucide) |
| Vite | 5.0.10 | Build tool & dev server |

### Databases

| Database | Usage |
|----------|-------|
| SQLite | Local development |
| PostgreSQL | Production (Heroku) |

### Tools & Services

| Tool | Purpose |
|------|---------|
| Git | Version control |
| GitHub | Repository hosting |
| GitHub Projects | Agile project management |
| Heroku | Cloud deployment |
| Postman | API testing |
| VS Code | Code editor |
| Draw.io | Flowcharts & ERD diagrams |
| Binance API | Cryptocurrency prices |
| Alpha Vantage API | Stock & forex prices |

---

## Agile Methodology

### GitHub Projects Board

This project was developed using Agile methodology with GitHub Projects as the management tool.

**Board Link:** [TradeSim Pro Project Board](https://github.com/users/SteveDok22/projects/XX)

### Sprint Structure

| Sprint | Focus |
|--------|-------|
| Sprint 1 | Setup, Auth, Models |
| Sprint 2 | Trading, Prices, API |
| Sprint 3 | Frontend, Testing, Deploy |

### User Stories

All user stories were created as GitHub Issues with:
- Acceptance Criteria
- Tasks checklist
- Labels (Must Have, Should Have, Could Have)
- Linked to Epics

---

## Testing

### Automated Testing

#### Python Tests (Django)
```bash
# Run all tests
python manage.py test

# Run with coverage
coverage run manage.py test
coverage report
```

### Bugs

### Resolved Issues

#### Bug #1: Custom User Model Migration Error
**Issue:** `AUTH_USER_MODEL refers to model 'accounts.CustomUser' that has not been installed`  
**Cause:** Custom User Model was defined after initial Django migrations were created  
**Fix:** Deleted all migration files and database, created CustomUser before first migration:
```bash
# Terminal commands
rm -rf accounts/migrations/0*.py
rm db.sqlite3
python manage.py makemigrations accounts
python manage.py migrate
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #2: CORS Error - No Access-Control-Allow-Origin
**Issue:** Browser blocking API requests with `No 'Access-Control-Allow-Origin' header present`  
**Cause:** Django backend rejecting requests from React frontend running on different port (3000)  
**Fix:** Installed and configured django-cors-headers in `settings.py`:
```python
# settings.py lines 25-30
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

# Lines 95-100
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
CORS_ALLOW_CREDENTIALS = True
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #3: JWT Token 401 Unauthorized
**Issue:** API returning `401 Unauthorized` even with valid JWT token  
**Cause:** Missing "Bearer " prefix when sending token in Authorization header  
**Fix:** Updated Postman/frontend to use correct header format:
```python
# Correct format
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}

# Wrong format (was causing error)
headers = {
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #4: User Has No Portfolio Error
**Issue:** `RelatedObjectDoesNotExist: User has no portfolio` when accessing portfolio endpoint  
**Cause:** Portfolio instance not automatically created when new user registers  
**Fix:** Added Django signal to create Portfolio on user creation in `accounts/signals.py`:
```python
# accounts/signals.py lines 10-20
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from portfolio.models import Portfolio

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_portfolio(sender, instance, created, **kwargs):
    if created:
        Portfolio.objects.create(user=instance)
```
**Status:** ✅ Resolved in v1.0.1

---

#### Bug #5: Floating Point Precision Error
**Issue:** Prices showing incorrect decimals (e.g., BTC: 97000.12345678901234)  
**Cause:** Using `FloatField` for monetary values caused floating-point precision errors  
**Fix:** Changed all monetary fields to `DecimalField` in models:
```python
# trading/models.py lines 45-55
from decimal import Decimal

entry_price = models.DecimalField(
    max_digits=18,
    decimal_places=8
)
pnl = models.DecimalField(
    max_digits=18,
    decimal_places=2
)
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #6: Django Sites Framework Error
**Issue:** `django.contrib.sites.models.Site.DoesNotExist` on startup  
**Cause:** Django Allauth requires Site object but database had none  
**Fix:** Added SITE_ID to settings and ran migrations:
```python
# settings.py line 75
SITE_ID = 1
```
```bash
# Terminal
python manage.py migrate sites
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #7: Alpha Vantage Returning None
**Issue:** Stock and forex prices returning `None` instead of actual values  
**Cause:** Free tier API rate limit (5 calls/minute) exceeded  
**Fix:** Implemented price caching in `trading/services/price_service.py`:
```python
# price_service.py lines 25-40
from django.core.cache import cache

CACHE_TIMEOUT = 30  # seconds

def get_price(self, symbol):
    # Check cache first
    cache_key = f'price_{symbol}'
    cached = cache.get(cache_key)
    if cached:
        return Decimal(str(cached))
    
    # Fetch from API
    price = self._fetch_from_api(symbol)
    
    # Cache the result
    if price:
        cache.set(cache_key, str(price), self.CACHE_TIMEOUT)
    
    return price
```
**Status:** ✅ Resolved in v1.0.2

---

#### Bug #8: Binance API KeyError
**Issue:** `KeyError: 'BTCUSDT'` when fetching cryptocurrency prices  
**Cause:** Sending internal symbol 'BTC' to Binance API instead of required format 'BTCUSDT'  
**Fix:** Created symbol mapping dictionary in `price_service.py`:
```python
# price_service.py lines 15-20
BINANCE_SYMBOLS = {
    'BTC': 'BTCUSDT',
    'ETH': 'ETHUSDT',
}

def _fetch_binance(self, symbol):
    api_symbol = self.BINANCE_SYMBOLS.get(symbol)
    response = requests.get(
        self.BINANCE_URL,
        params={'symbol': api_symbol}
    )
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #9: Incorrect PnL for SELL Positions
**Issue:** Short (SELL) positions calculating profit/loss incorrectly  
**Cause:** Using same PnL formula for both BUY and SELL trade types  
**Fix:** Added conditional calculation in `trading/models.py`:
```python
# trading/models.py lines 70-85
def calculate_pnl(self, current_price):
    current_price = Decimal(str(current_price))
    
    if self.trade_type == 'BUY':
        # Long: profit when price goes UP
        price_diff = current_price - self.entry_price
    else:
        # Short: profit when price goes DOWN
        price_diff = self.entry_price - current_price
    
    pnl_amount = price_diff * self.quantity
    pnl_percent = (price_diff / self.entry_price) * 100
    
    return (round(pnl_amount, 2), round(pnl_percent, 2))
```
**Status:** ✅ Resolved in v1.0.1

---

#### Bug #10: Allauth Middleware Missing
**Issue:** `ImproperlyConfigured: allauth requires AccountMiddleware`  
**Cause:** Django-allauth v0.60+ requires explicit middleware configuration  
**Fix:** Added middleware to `settings.py`:
```python
# settings.py MIDDLEWARE list
MIDDLEWARE = [
    ...
    'allauth.account.middleware.AccountMiddleware',
]
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #11: Negative Balance After Trade
**Issue:** User balance becoming negative when opening large trades  
**Cause:** No validation checking if user has sufficient funds before trade  
**Fix:** Added balance validation in `trading/views.py`:
```python
# trading/views.py lines 85-95
def post(self, request):
    amount_usd = Decimal(str(data['amount_usd']))
    
    # Check balance before trade
    if amount_usd > request.user.account_balance:
        return Response(
            {'error': f'Insufficient funds. Available: ${request.user.account_balance}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Proceed with trade...
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #12: ModuleNotFoundError for Services
**Issue:** `ModuleNotFoundError: No module named 'trading.services'`  
**Cause:** Missing `__init__.py` file in services directory  
**Fix:** Created init file in `trading/services/__init__.py`:
```python
# trading/services/__init__.py
from .price_service import PriceService

__all__ = ['PriceService']
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #13: Circular Import Error
**Issue:** `ImportError: cannot import name 'Trade' from partially initialized module`  
**Cause:** Portfolio model directly importing Trade model which imports User  
**Fix:** Used string reference instead of direct import in ForeignKey:
```python
# portfolio/models.py line 25
# Before (causing error)
from trading.models import Asset
asset = models.ForeignKey(Asset, on_delete=models.CASCADE)

# After (fixed)
asset = models.ForeignKey(
    'trading.Asset',
    on_delete=models.CASCADE
)
```
**Status:** ✅ Resolved in v1.0.1

---

#### Bug #14: Token Blacklist Table Missing
**Issue:** `ProgrammingError: relation "token_blacklist_outstandingtoken" does not exist`  
**Cause:** SimpleJWT blacklist app not in INSTALLED_APPS  
**Fix:** Added app and ran migrations:
```python
# settings.py
INSTALLED_APPS = [
    ...
    'rest_framework_simplejwt.token_blacklist',
]
```
```bash
python manage.py migrate
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #15: DisallowedHost on Heroku
**Issue:** `DisallowedHost at / - Invalid HTTP_HOST header`  
**Cause:** Heroku domain not included in Django ALLOWED_HOSTS  
**Fix:** Updated production settings:
```python
# settings.py
import os

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

# Heroku config
# heroku config:set ALLOWED_HOSTS=tradesim-pro-app.herokuapp.com
```
**Status:** ✅ Resolved in v1.0.0

---

#### Bug #16: Heroku "No Process Types" Warning
**Issue:** Heroku showing "This app has no process types yet" after deployment  
**Cause:** Procfile was in `backend/` folder but Heroku reads from repository root  
**Fix:** Created Procfile in repository root with correct path:
```
# Procfile (in repository root)
web: cd backend && gunicorn tradesim.wsgi:application
```
**Status:** ✅ Resolved in v1.0.3

---

#### Bug #17: 43 Unapplied Migrations on Heroku
**Issue:** Console showing "I have 43 unapplied migration(s)" after first deploy  
**Cause:** Database migrations not automatically run on Heroku PostgreSQL  
**Fix:** Manually ran migrations via Heroku Console:
```bash
# Heroku Console
cd backend && python manage.py migrate
```
**Note:** For future deploys, added release command to Procfile (optional)
**Status:** ✅ Resolved in v1.0.3

---

---

#### Bug #18: npm ENOENT spawn Error on Windows
**Issue:** `npm error syscall spawn C:\Users\name\.local\bin ENOENT` when running any npm command  
**Cause:** Windows COMSPEC environment variable pointing to non-existent path instead of cmd.exe  
**Fix:** Corrected COMSPEC in Windows System Environment Variables:
```
# Windows Environment Variables
# Changed COMSPEC from:
C:\Users\name\.local\bin

# To correct value:
C:\Windows\System32\cmd.exe
```
**Status:** ✅ Resolved in v1.0.4

---

#### Bug #19: create-react-app Deprecated and Failing
**Issue:** `create-react-app is deprecated` warning followed by installation failure  
**Cause:** create-react-app no longer maintained, incompatible with Node.js v22  
**Fix:** Used Vite instead of create-react-app for React project:
```bash
# Instead of:
npx create-react-app frontend

# Used:
npm init -y
npm install react react-dom react-router-dom axios react-toastify
npm install --save-dev vite @vitejs/plugin-react
```
**Status:** ✅ Resolved in v1.0.4

---

#### Bug #20: Static Files 404 on Heroku
**Issue:** React app showing white screen, console showing 404 for CSS and JS files  
**Cause:** `backend/static/assets/` folder was in `.gitignore` and not pushed to repository  
**Fix:** Force-added static files to git:
```bash
git add -f backend/static/assets/index-CL5wzFLI.js
git add -f backend/static/assets/index-CzIug_8o.css
git commit -m "Add React build assets for production"
git push origin main
```
**Status:** ✅ Resolved in v1.0.5

---

#### Bug #21: React Router Routes Not Working on Heroku
**Issue:** Direct URL access to `/dashboard` or `/trade` returning Django 404  
**Cause:** Django not configured to serve React app for client-side routes  
**Fix:** Added catch-all URL pattern in `tradesim/urls.py`:
```python
# tradesim/urls.py
from django.urls import re_path
from django.views.generic import TemplateView

urlpatterns = [
    # API routes first
    path('api/', ...),
    path('admin/', ...),
    
    # Catch-all for React Router (must be last)
    re_path(r'^(?!api|admin|static).*$', 
            TemplateView.as_view(template_name='index.html'), 
            name='frontend'),
]
```
**Status:** ✅ Resolved in v1.0.5

---

#### Bug #22: MIME Type Error for CSS on Heroku
**Issue:** `Refused to apply style... MIME type ('text/html') is not a supported stylesheet MIME type`  
**Cause:** Static files returning HTML error page instead of actual CSS/JS content  
**Fix:** Ensured WhiteNoise properly configured and static files collected:
```python
# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Must be second
    ...
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'
STATICFILES_DIRS = [BASE_DIR / 'static']
```
```bash
# On Heroku console
cd backend && python manage.py collectstatic --noinput
```
**Status:** ✅ Resolved in v1.0.5

---

#### Bug #23: Vite Build Assets Path Mismatch
**Issue:** Locally working React app failing on Heroku with wrong asset paths  
**Cause:** Vite build creates hashed filenames, but `index.html` had hardcoded paths  
**Fix:** Updated `backend/templates/index.html` with correct asset paths after each build:
```html
<!-- Check actual filenames in backend/static/assets/ -->
<link rel="stylesheet" href="/static/assets/index-CzIug_8o.css">
<script type="module" src="/static/assets/index-CL5wzFLI.js"></script>
```
**Note:** After each `npm run build`, asset filenames may change and need updating
**Status:** ✅ Resolved in v1.0.5

---

#### Bug #24: Frontend API Calls to Wrong URL in Production
**Issue:** React app calling `localhost:8000` instead of Heroku URL in production  
**Cause:** Hardcoded API URL in axios configuration  
**Fix:** Used Vite environment detection in `frontend/src/api/axios.js`:
```javascript
// axios.js
const API_URL = import.meta.env.PROD 
  ? '/api'                          // Production: same domain
  : 'http://127.0.0.1:8000/api'     // Development: localhost

const api = axios.create({
  baseURL: API_URL,
  ...
})
```
**Status:** ✅ Resolved in v1.0.5

---

### Known Issues

#### Issue #1: Alpha Vantage Rate Limiting
**Description:** Free Alpha Vantage API tier limited to 5 calls/minute, 500 calls/day  
**Impact:** Medium - stock and forex prices may show "unavailable" during high usage  
**Workaround:** Implemented 30-second caching to reduce API calls  
**Planned Fix:** Upgrade to premium API key for production (v2.0)

---

#### Issue #2: Price Delay on First Load
**Description:** First price fetch after cache expiry takes 1-2 seconds  
**Impact:** Low - slight delay on initial page load  
**Workaround:** Prices cached for 30 seconds, subsequent loads instant  
**Planned Fix:** Implement background price refresh task with Celery (v2.0)

---

#### Issue #3: UTC Timezone Display
**Description:** All timestamps displayed in UTC regardless of user location  
**Impact:** Low - user sees trades in UTC time  
**Workaround:** None currently  
**Planned Fix:** Add user timezone preference in profile settings (v2.0)

---

#### Issue #4: No Real-Time Price Updates
**Description:** Prices require manual page refresh to update  
**Impact:** Medium - users must refresh to see latest prices  
**Workaround:** Users can manually refresh the page  
**Planned Fix:** Implement WebSocket connection for real-time updates (v2.0)

---

#### Issue #5: Manual Static File Update After Frontend Build
**Description:** After running `npm run build`, asset filenames change (hash-based) and require manual update in `backend/templates/index.html`  
**Impact:** Low - only affects deployment workflow  
**Workaround:** Check `frontend/dist/assets/` for new filenames and update `index.html`  
**Planned Fix:** Implement automated build script to copy and update paths (v2.0)

---

#### Issue #6: Two Servers Required for Local Development
**Description:** Need to run both Django backend (port 8000) and Vite frontend (port 3000) simultaneously  
**Impact:** Low - minor inconvenience during development  
**Workaround:** Use two terminal windows  
**Planned Fix:** Create combined development script or Docker setup (v2.0)

---

## Deployment

### Heroku Deployment

The application is deployed on Heroku using GitHub integration.

**Live URL:** https://tradesim-pro-stiven-62203fadbb77.herokuapp.com

#### Deployment Steps

1. **Create Heroku App**
    - Log in to [Heroku Dashboard](https://dashboard.heroku.com/)
   - Click "New" → "Create new app"
   - Enter app name and select region (Europe)
   - Click "Create app"

2. **Connect GitHub Repository**
  - Go to "Deploy" tab
   - Select "GitHub" as deployment method
   - Search and connect your repository
   - Enable "Automatic Deploys" (optional)


3. **Add PostgreSQL Database**
   - Go to "Resources" tab
   - In "Add-ons" search for "Heroku Postgres"
   - Select "Essential 0" plan (or available free tier)
   - Click "Submit Order Form"
   - DATABASE_URL is automatically added to Config Vars

4. **Configure Environment Variables**
   - Go to Settings tab → "Reveal Config Vars"
   - Add the following variables:

   | Key | Value |
   |-----|-------|
   | `SECRET_KEY` | Your Django secret key |
   | `DEBUG` | `False` |
   | `ALPHA_VANTAGE_KEY` | Your API key |
   | `DISABLE_COLLECTSTATIC` | `0` |

5. **Add Python Buildpack**
   - In "Settings" tab → "Buildpacks"
   - Click "Add buildpack"
   - Select "python"
   - Click "Save changes"

6. **Deploy**
   - Go to Deploy tab
   - Click "Deploy Branch" (main)
   - Wait for build to complete

7. **Run Database Migrations**
   - Click "More" (top right) → "Run console"
   - Enter: `cd backend && python manage.py migrate`
   - Click "Run"

8. **Collect Static Files**
   - In console enter: `cd backend && python manage.py collectstatic --noinput`
   - Click "Run"

9. **Create Superuser (Optional)**
   - In console enter: `cd backend && python manage.py createsuperuser`
   - Follow prompts to create admin account

10. **Add Initial Assets**
    - Go to `https://your-app.herokuapp.com/admin/`
    - Login with superuser credentials
    - Add Asset records:
      - BTC (Bitcoin) - CRYPTO - BINANCE
      - ETH (Ethereum) - CRYPTO - BINANCE
      - TSLA (Tesla) - STOCK - ALPHAVANTAGE
      - AAPL (Apple) - STOCK - ALPHAVANTAGE
      - EURUSD - FOREX - ALPHAVANTAGE
      - GBPUSD - FOREX - ALPHAVANTAGE

#### Project Structure for Heroku
```
tradesim-pro/
├── backend/
│   ├── tradesim/          # Django project settings
│   ├── accounts/          # User authentication app
│   ├── trading/           # Trading functionality app
│   ├── portfolio/         # Portfolio management app
│   ├── templates/         # React index.html
│   ├── static/            # React build assets
│   ├── staticfiles/       # Collected static files
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/               # React source code
│   ├── dist/              # Production build
│   └── package.json
├── Procfile               # Heroku process file
├── runtime.txt            # Python version
└── requirements.txt       # Root requirements
```

#### Heroku Files

**Procfile** (repository root):
```
web: cd backend && gunicorn tradesim.wsgi:application
```

**runtime.txt** (repository root):
```
python-3.12.0
```

### Local Development

#### Prerequisites
- Python 3.12+
- Node.js 18+ and npm
- Git

#### Setup Steps

1. **Clone Repository**
```bash
git clone https://github.com/SteveDok22/TradeSim-Pro.git
cd TradeSim-Pro/backend
```

2. **Create Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Create .env File**
```
SECRET_KEY=your-secret-key
DEBUG=True
ALPHA_VANTAGE_KEY=your-api-key
```

5. **Run Migrations**
```bash
python manage.py migrate
```

6. **Create Superuser**
```bash
python manage.py createsuperuser
```

7. **Run Server**
```bash
python manage.py runserver
```

8. **Access Application**
- API: http://127.0.0.1:8000/api/
- Admin: http://127.0.0.1:8000/admin/

#### Frontend Setup (Development)

1. **Open New Terminal**

2. **Navigate to Frontend**
```bash
cd frontend
```

3. **Install Node Dependencies**
```bash
npm install
```

4. **Run Development Server**
```bash
npm run dev
```
- Frontend available at: http://localhost:3000/
- Hot reload enabled for development

#### Running Both Together

For local development, you need **two terminals**:

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # Windows
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### Building Frontend for Production

To update the production build:
```bash
cd frontend
npm run build
```

Then copy build files to backend:
```bash
# From frontend folder
Copy-Item dist\index.html ..\backend\templates\
Copy-Item -Recurse -Force dist\assets\* ..\backend\static\assets\
```

Update paths in `backend/templates/index.html` if asset filenames changed.

#### Environment Variables

| Variable | Development | Production |
|----------|-------------|------------|
| `SECRET_KEY` | Any string | Strong random string |
| `DEBUG` | `True` | `False` |
| `ALPHA_VANTAGE_KEY` | My API key | My API key |
| `DATABASE_URL` | Not needed (SQLite) | Heroku Postgres URL |

---

### Forking the Repository

1. Go to [GitHub Repository](https://github.com/SteveDok22/tradesim-pro)
2. Click "Fork" button (top right)
3. Select your account
4. Clone your forked repository

### Cloning the Repository
```bash
git clone https://github.com/YOUR-USERNAME/tradesim-pro.git
cd tradesim-pro
```

## Credits

For detailed code attribution and resources, see [CODE_ATTRIBUTION.md](docs/CODE_ATTRIBUTION.md)

### Quick Summary

| Category | Source |
|----------|--------|
| Backend Framework | [Django 5.0](https://docs.djangoproject.com/) |
| API Framework | [Django REST Framework](https://www.django-rest-framework.org/) |
| Authentication | [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/) |
| Crypto Prices | [Binance API](https://binance-docs.github.io/apidocs/) |
| Stock/Forex Prices | [Alpha Vantage](https://www.alphavantage.co/documentation/) |

### Acknowledgements

- **Code Institute** - For the learning materials and project guidelines
- **My Mentor** - For guidance and feedback throughout the project
- **Slack Community** - For support and troubleshooting help

---

**Developed by Stiven** | [GitHub](https://github.com/SteveDok22) | 2025