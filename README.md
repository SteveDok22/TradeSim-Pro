# TradeSim Pro - Prop Trading Simulator

![Am I Responsive](docs/responsive-mockup.png)

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

#### F1: User Authentication

![Authentication Screenshot](docs/features/auth.png)

- Secure registration with email validation
- Login with JWT token authentication
- Password hashing with Django
- Session management

#### F2: Real-Time Market Data

![Prices Screenshot](docs/features/prices.png)

- Live cryptocurrency prices (BTC, ETH) from Binance
- Stock quotes (TSLA, META, AAPL) from Alpha Vantage
- Forex rates (GBPUSD, EURUSD, USDJPY) from Alpha Vantage
- Auto-refresh every 30 seconds

#### F3: Trading Simulator

![Trading Screenshot](docs/features/trading.png)

- Open BUY positions with one click
- Close positions (SELL) and see PnL
- Position sizing based on percentage of balance
- Optional Stop-Loss and Take-Profit

#### F4: Portfolio Dashboard

![Portfolio Screenshot](docs/features/portfolio.png)

- Real-time account balance
- Total PnL calculation
- Win rate percentage
- Performance chart over time

#### F5: Trade History

![History Screenshot](docs/features/history.png)

- Complete trade log
- Filter by asset, status, date
- Sort by any column
- PnL per trade

#### F6: Watchlist

![Watchlist Screenshot](docs/features/watchlist.png)

- Add/remove favorite assets
- Quick access to watched prices
- One-click trade from watchlist

#### F7: User Feedback System

![Toast Screenshot](docs/features/toast.png)

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

## Deployment

### Heroku Deployment

The application is deployed on Heroku using GitHub integration.

**Live URL:** https://tradesim-pro-stiven-62203fadbb77.herokuapp.com

#### Deployment Steps

1. **Create Heroku App**
   - Log in to [Heroku Dashboard](https://dashboard.heroku.com/)
   - Click "New" → "Create new app"
   - Enter app name and select region (Europe)

2. **Connect GitHub Repository**
   - In Deploy tab, select "GitHub" as deployment method
   - Search and connect your repository
   - Enable "Automatic Deploys" (optional)

3. **Add PostgreSQL Database**
   - Go to Resources tab
   - Search for "Heroku Postgres"
   - Select "Essential 0" plan
   - Database URL automatically added to Config Vars

4. **Configure Environment Variables**
   - Go to Settings tab → "Reveal Config Vars"
   - Add the following variables:

   | Key | Value |
   |-----|-------|
   | `SECRET_KEY` | Your secret key |
   | `DEBUG` | `False` |
   | `ALPHA_VANTAGE_KEY` | Your API key |
   | `DISABLE_COLLECTSTATIC` | `0` |

5. **Add Buildpack**
   - In Settings tab → Buildpacks
   - Add "python" buildpack

6. **Deploy**
   - Go to Deploy tab
   - Click "Deploy Branch" (main)
   - Wait for build to complete

7. **Run Migrations**
   - Click "More" → "Run console"
   - Enter: `cd backend && python manage.py migrate`

8. **Create Superuser**
   - In console: `cd backend && python manage.py createsuperuser`

9. **Add Initial Data**
   - Access admin panel: `/admin/`
   - Add Asset records (BTC, ETH, TSLA, etc.)

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
- Git
- Virtual environment

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