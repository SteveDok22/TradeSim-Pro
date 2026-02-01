# TradeSim Pro - Prop Trading Simulator

<div align="center">
<img src="docs/screenshots/tradesim-pro.gif" alt="Am I Responsive" width="900">
</div>

<div align="center">

**Live Site:** [TradeSim Pro on Heroku](https://tradesim-pro-stiven-62203fadbb77.herokuapp.com)

**Repository:** [GitHub](https://github.com/SteveDok22/tradesim-pro)

</div>

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

<div align="center">
<img src="docs/images/TradeSimProApplicationFlow.png" alt="Application Flowchart" width="800">
</div>

---

### API Request Flowchart

<div align="center">
<img src="docs/images/API-RequestFlow.png" alt="API Request Flowchart" width="800">
</div>

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

<div align="center">
<img src="docs/wireframes/landing-desktop.png" alt="Landing Page Wireframe" width="700">
</div>

</details>

<details>
<summary>Dashboard</summary>

<div align="center">
<img src="docs/wireframes/dashboard-desktop.png" alt="Dashboard Wireframe" width="700">
</div>

</details>

<details>
<summary>Trading View</summary>

<div align="center">
<img src="docs/wireframes/trading-desktop.png" alt="Trading Wireframe" width="700">
</div>

</details>

#### Mobile Views

<details>
<summary>Mobile Landing</summary>

<div align="center">
<img src="docs/wireframes/landing-mobile.png" alt="Mobile Landing Wireframe" width="300">
</div>

</details>

<details>
<summary>Mobile Dashboard</summary>

<div align="center">
<img src="docs/wireframes/dashboard-mobile.png" alt="Mobile Dashboard Wireframe" width="300">
</div>

</details>

### Design Choices

#### Colour Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Accent Teal | `#00d4aa` | Primary buttons, success states |
| Success Green | `#00d4aa` | Profit indicators, buy buttons |
| Danger Red | `#ff6b6b` | Loss indicators, sell buttons |
| Warning Yellow | `#ffd93d` | Forex badges, warnings |
| Dark Background | `#0a0a0f` | Page background |
| Card Background | `#1a1a2e` | Cards, containers |
| Text Primary | `#ffffff` | Main text |
| Text Secondary | `#b8b8d3` | Secondary text |

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
- **Video Backgrounds:** Immersive, professional FinTech aesthetic

---

## Features

### Existing Features

#### F1: User Authentication

<div align="center">
<img src="docs/screenshots/login-desktop.png" alt="Login Screenshot" width="700">
</div>

- Secure registration with email validation
- Login with JWT token authentication
- Password hashing with Django
- Session management
- Video background for immersive experience

---

#### F2: Real-Time Market Data with TradingView Charts

<div align="center">
<img src="docs/screenshots/dashboard-demo.gif" alt="Dashboard Demo" width="700">
</div>

- Live cryptocurrency prices (BTC, ETH) from Binance
- Stock quotes (TSLA, META, AAPL) from Alpha Vantage
- Forex rates (GBPUSD, EURUSD, USDJPY) from Alpha Vantage
- **TradingView mini charts** for each asset
- **Full TradingView chart modal** on click
- Auto-refresh every 30 seconds

---

#### F3: Trading Simulator

<div align="center">
<img src="docs/screenshots/trade-demo.gif" alt="Trading Demo" width="700">
</div>

- Open BUY/SELL positions with one click
- Real-time price display
- Quick amount buttons ($100, $500, $1000, $5000)
- Trade summary before execution
- Live prices sidebar
- **Video background** for immersive experience

---

#### F4: Portfolio Dashboard

<div align="center">
<img src="docs/screenshots/dashboard-demo.gif" alt="Dashboard Screenshot" width="700">
</div>

- Real-time account balance
- Total unrealized PnL calculation
- Open positions count
- Trading tier display
- **Reset Balance** button to restart with $10,000
- Quick action buttons with professional icons

---

#### F5: Positions Management

<div align="center">
<img src="docs/screenshots/positions-demo.gif" alt="Positions Demo" width="700">
</div>

- View all open positions
- Real-time PnL updates
- Close positions with one click
- Position details (entry price, current price, quantity)
- Total unrealized PnL summary

---

#### F6: Watchlist

<div align="center">
<img src="docs/screenshots/watchlist-demo.gif" alt="Watchlist Demo" width="700">
</div>

- Add/remove favorite assets
- Quick access to watched prices
- One-click trade from watchlist
- Asset type badges (Crypto, Stock, Forex)

---

#### F7: Mobile Responsive Design

<div align="center">
<img src="docs/screenshots/mobile-demo1.gif" alt="Mobile Demo 1" width="250">
<img src="docs/screenshots/mobile-demo2.gif" alt="Mobile Demo 2" width="250">
</div>

- Fully responsive on all devices
- **Hamburger menu** for mobile navigation
- Touch-friendly interface
- Optimized layouts for small screens

---

#### F8: Video Backgrounds

- Dynamic video backgrounds on key pages:
  - Home page - Trading animation
  - Login/Register - Chart visualization
  - Trade page - Market data animation
  - Positions/Watchlist - Trading theme

---

#### F9: Professional UI with React Icons

- **Feather/Lucide icons** throughout the app
- Clean, modern FinTech aesthetic
- TradingView-inspired design
- Consistent visual language

---

#### F10: User Feedback System

<div align="center">
<img src="docs/screenshots/notification.png" alt="Toast Notification" width="400">
</div>

- Success notifications on actions
- Error messages for validation
- Confirmation dialogs for critical actions
- Loading indicators

---

### Future Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Trade Journal | Notes and emotions per trade | Medium |
| Paper Trading Leagues | Compete with other users | Low |
| Advanced Charts | More TradingView features | Medium |
| Mobile App | Native iOS/Android app | Low |
| Email Alerts | Price alert notifications | Medium |

---

## Database Design

### Entity Relationship Diagram

<div align="center">
<img src="docs/images/ERD-Diagram.png" alt="ERD Diagram" width="800">
</div>

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

#### External Services

| Service | Purpose |
|---------|---------|
| TradingView Widgets | Interactive charts |
| Binance API | Cryptocurrency prices |
| Alpha Vantage API | Stock & forex prices |

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

---

## Agile Methodology

### GitHub Projects Board

This project was developed using Agile methodology with GitHub Projects as the management tool.

**Board Link:** [TradeSim Pro Project Board](https://github.com/users/SteveDok22/projects/5)

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

## Validation Testing

### Python (PEP8 / Flake8)

All Python files were validated using Flake8 with `--max-line-length=120`.

<div align="center">

| File | Lines | Issues | Status | Screenshot |
|------|-------|--------|--------|------------|
| `manage.py` | 23 | 0 | ✅ Pass | ![View](docs/screenshots/manage.py.png) |
| `config/settings.py` | 205 | 0 | ✅ Pass | ![View](docs/screenshots/config.settings.py.png) |
| `config/urls.py` | 53 | 0 | ✅ Pass | ![View](docs/screenshots/config.urls.py.png) |
| `config/wsgi.py` | 16 | 0 | ✅ Pass | ![View](docs/screenshots/config.wsgi.py.png) |
| `authentication/models.py` | 44 | 0 | ✅ Pass | ![View](docs/screenshots/authentication.models.py.png) |
| `authentication/views.py` | 99 | 0 | ✅ Pass | ![View](docs/screenshots/authentication.views.py.png) |
| `authentication/serializers.py` | 71 | 0 | ✅ Pass | ![View](docs/screenshots/authentication.serializers.py.png) |
| `authentication/urls.py` | 32 | 0 | ✅ Pass | ![View](docs/screenshots/authentication.urls.py.png) |
| `trading/models.py` | 125 | 0 | ✅ Pass | ![View](docs/screenshots/trading.models.py.png) |
| `trading/views.py` | 263 | 0 | ✅ Pass | ![View](docs/screenshots/trading.views.py.png) |
| `trading/serializers.py` | 86 | 0 | ✅ Pass | ![View](docs/screenshots/trading.serializers.py.png) |
| `trading/urls.py` | 26 | 0 | ✅ Pass | ![View](docs/screenshots/trading.urls.py.png) |
| `portfolio/models.py` | 82 | 0 | ✅ Pass | ![View](docs/screenshots/portfolio.models.py.png) |
| `portfolio/views.py` | 47 | 0 | ✅ Pass | ![View](docs/screenshots/portfolio.views.py.png) |
| `portfolio/serializers.py` | 47 | 0 | ✅ Pass | ![View](docs/screenshots/portfolio.serializers.py.png) |
| `portfolio/urls.py` | 23 | 0 | ✅ Pass | ![View](docs/screenshots/portfolio.urls.py.png) |
| **TOTAL** | **1,242** | **0** | **100%** | - |

[Validate Python Code →](https://pep8ci.herokuapp.com/)

</div>

---

### JavaScript/JSX (ESLint)

All React components and JavaScript files were validated using ESLint.

<div align="center">

| File | Lines | Issues | Status | Screenshot |
|------|-------|--------|--------|------------|
| `main.jsx` | 19 | 0 | ✅ Pass | ![View](docs/screenshots/src.main.jsx.png) |
| `App.jsx` | 43 | 0 | ✅ Pass | ![View](docs/screenshots/src.App.jsx.png) |
| `context/AuthContext.jsx` | 68 | 0 | ✅ Pass | ![View](docs/screenshots/context.AuthContext.jsx.png) |
| `api/auth.js` | 28 | 0 | ✅ Pass | ![View](docs/screenshots/api.auth.js.png) |
| `api/trading.js` | 33 | 0 | ✅ Pass | ![View](docs/screenshots/api.trading.js.png) |
| `api/portfolio.js` | 28 | 0 | ✅ Pass | ![View](docs/screenshots/api.portfolio.js.png) |
| `components/common/Navbar.jsx` | 95 | 0 | ✅ Pass | ![View](docs/screenshots/components.common.Navbar.jsx.png) |
| `components/common/TradingViewChart.jsx` | 55 | 0 | ✅ Pass | ![View](docs/screenshots/components.common.TradingViewChart.jsx.png) |
| `components/common/ChartModal.jsx` | 45 | 0 | ✅ Pass | ![View](docs\screenshots\components.commonChartModal.jsx.png) |
| `pages/Home.jsx` | 85 | 0 | ✅ Pass | ![View](docs\screenshots\pagesHome.jsx.png) |
| `pages/Login.jsx` | 75 | 0 | ✅ Pass | ![View](docs\screenshots\pagesLogin.jsx.png) |
| `pages/Register.jsx` | 80 | 0 | ✅ Pass | ![View](docs\screenshots\pagesRegister.jsx.png) |
| `pages/Dashboard.jsx` | 180 | 0 | ✅ Pass | ![View](docs\screenshots\pagesDashboard.jsx.png) |
| `pages/Trade.jsx` | 165 | 0 | ✅ Pass | ![View](docs\screenshots\pagesTrade.jsx.png) |
| `pages/Positions.jsx` | 120 | 0 | ✅ Pass | ![View](docs\screenshots\pagesPositions.jsx.png) |
| `pages/History.jsx` | 95 | 0 | ✅ Pass | ![View](docs\screenshots\pagesHistory.jsx.png) |
| `pages/Watchlist.jsx` | 110 | 0 | ✅ Pass | ![View](docs\screenshots\pagesWatchlist.jsx.png) |
| **TOTAL** | **1,424** | **0** | **100%** | - |

[Validate JS Code →](https://eslint.org/play/)

[Validate JSX/Reac Code →](https://jsontotable.org/jsx-validator?utm_source=chatgpt.com)

</div>

---

### CSS (W3C CSS Validator)

All CSS files were validated using the W3C CSS Validation Service.

<div align="center">

| File | Lines | Issues | Status | Screenshot |
|------|-------|--------|--------|------------|
| `styles/index.css` | 150 | 0 | ✅ Pass | ![View](docs/screenshots/styles.index.css.png) |
| `components/common/Navbar.css` | 185 | 0 | ✅ Pass | ![View](docs/screenshots/common.Navbar.css.png) |
| `components/common/ChartModal.css` | 65 | 0 | ✅ Pass | ![View](docs/screenshots/common.ChartModal.css.png) |
| `pages/Home.css` | 140 | 0 | ✅ Pass | ![View](docs/screenshots/pages.Home.css.png) |
| `pages/Auth.css` | 120 | 0 | ✅ Pass | ![View](docs/screenshots/pages.Auth.css.png) |
| `pages/Dashboard.css` | 280 | 0 | ✅ Pass | ![View](docs/screenshots/pages.Dashboard.css.png) |
| `pages/Trade.css` | 220 | 0 | ✅ Pass | ![View](docs/screenshots/pages.Trade.css.png) |
| `pages/Positions.css` | 175 | 0 | ✅ Pass | ![View](docs/screenshots/pages.Positions.css.png) |
| `pages/Watchlist.css` | 160 | 0 | ✅ Pass | ![View](docs/screenshots/pages.Watchlist.css.png) |
| **TOTAL** | **1,495** | **0** | **100%** | - |

[Validate CSS Code →](https://jigsaw.w3.org/css-validator/)

</div>

---

### HTML (W3C HTML Validator)

<div align="center">

| File | Issues | Status | Screenshot |
|------|--------|--------|------------|
| `frontend/index.html` | 0 | ✅ Pass | ![View](docs/screenshots/home(frontend).png) |
| `backend/templates/index.html` | 0 | ✅ Pass | ![View](docs/screenshots/home(backend-template).png) |

[Validate HTML Code →](https://validator.w3.org/)

</div>

---

### Lighthouse Performance

<div align="center">

| Page | Performance | Accessibility | Best Practices | SEO | Screenshot |
|------|:-----------:|:-------------:|:--------------:|:---:|------------|
| Home (Desktop) | 🟢 100 | 🟢 96 | 🟢 100 | 🟠 92 | ![View](docs/screenshots/DesktopRunSpeed.png) |
| Home (Mobile) | 🟢 99 | 🟠 85 | 🟢 100 | 🟠 92 | ![View](docs/screenshots/MobileRunSpeed.png) |

[Run Lighthouse →](https://pagespeed.web.dev/analysis/https-tradesim-pro-stiven-62203fadbb77-herokuapp-com/aboic5dd8d?form_factor=mobile)

</div>

### Automated Testing

#### Python Tests (Django)
```bash
# Run all tests
python manage.py test

# Run with coverage
coverage run manage.py test
coverage report
```

**Test Results:** 29 tests passing ✅

---

### Bugs

### Resolved Issues

#### Bug #1: Custom User Model Migration Error
**Issue:** `AUTH_USER_MODEL refers to model 'accounts.CustomUser' that has not been installed`  
**Cause:** Custom User Model was defined after initial Django migrations were created  
**Fix:** Deleted all migration files and database, created CustomUser before first migration:
```bash
rm -rf accounts/migrations/0*.py
rm db.sqlite3
python manage.py makemigrations accounts
python manage.py migrate
```
**Status:** ✅ Resolved

---

#### Bug #2: CORS Error - No Access-Control-Allow-Origin
**Issue:** Browser blocking API requests with `No 'Access-Control-Allow-Origin' header present`  
**Cause:** Django backend rejecting requests from React frontend running on different port (3000)  
**Fix:** Installed and configured django-cors-headers in `settings.py`:
```python
INSTALLED_APPS = [
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
```
**Status:** ✅ Resolved

---

#### Bug #3: JWT Token 401 Unauthorized
**Issue:** API returning `401 Unauthorized` even with valid JWT token  
**Cause:** Missing "Bearer " prefix when sending token in Authorization header  
**Fix:** Updated frontend to use correct header format:
```python
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}
```
**Status:** ✅ Resolved

---

#### Bug #4: User Has No Portfolio Error
**Issue:** `RelatedObjectDoesNotExist: User has no portfolio` when accessing portfolio endpoint  
**Cause:** Portfolio instance not automatically created when new user registers  
**Fix:** Added Django signal to create Portfolio on user creation:
```python
@receiver(post_save, sender=User)
def create_user_portfolio(sender, instance, created, **kwargs):
    if created:
        Portfolio.objects.create(user=instance)
```
**Status:** ✅ Resolved

---

#### Bug #5: Floating Point Precision Error
**Issue:** Prices showing incorrect decimals (e.g., BTC: 97000.12345678901234)  
**Cause:** Using `FloatField` for monetary values  
**Fix:** Changed all monetary fields to `DecimalField`:
```python
entry_price = models.DecimalField(max_digits=18, decimal_places=8)
```
**Status:** ✅ Resolved

---

#### Bug #6: Alpha Vantage Returning None
**Issue:** Stock and forex prices returning `None`  
**Cause:** Free tier API rate limit (5 calls/minute) exceeded  
**Fix:** Implemented 30-second price caching:
```python
cache_key = f'price_{symbol}'
cached = cache.get(cache_key)
if cached:
    return Decimal(str(cached))
```
**Status:** ✅ Resolved

---

#### Bug #7: Static Files 404 on Heroku
**Issue:** React app showing white screen, 404 for CSS and JS files  
**Cause:** `backend/static/assets/` folder was in `.gitignore`  
**Fix:** Force-added static files to git:
```bash
git add -f backend/static/assets/
```
**Status:** ✅ Resolved

---

#### Bug #8: React Router Routes Not Working on Heroku
**Issue:** Direct URL access to `/dashboard` returning Django 404  
**Cause:** Django not configured to serve React app for client-side routes  
**Fix:** Added catch-all URL pattern:
```python
re_path(r'^(?!api|admin|static).*$', 
        TemplateView.as_view(template_name='index.html'))
```
**Status:** ✅ Resolved

---

#### Bug #9: MIME Type Error for CSS on Heroku
**Issue:** `Refused to apply style... MIME type ('text/html')`  
**Cause:** Static files returning HTML error page  
**Fix:** Properly configured WhiteNoise and ran collectstatic:
```bash
cd backend && python manage.py collectstatic --noinput
```
**Status:** ✅ Resolved

---

### Known Issues

| Issue | Description | Impact | Workaround |
|-------|-------------|--------|------------|
| API Rate Limiting | Alpha Vantage limited to 5 calls/minute | Medium | 30-second caching |
| Price Delay | First price fetch takes 1-2 seconds | Low | Prices cached after first load |
| UTC Timezone | Timestamps displayed in UTC | Low | None currently |

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
   - Go to "Deploy" tab
   - Select "GitHub" as deployment method
   - Connect your repository

3. **Add PostgreSQL Database**
   - Go to "Resources" tab
   - Search for "Heroku Postgres"
   - Select "Essential 0" plan

4. **Configure Environment Variables**
   - Go to Settings → "Reveal Config Vars"
   - Add:

   | Key | Value |
   |-----|-------|
   | `SECRET_KEY` | Your Django secret key |
   | `DEBUG` | `False` |
   | `ALPHA_VANTAGE_KEY` | Your API key |

5. **Deploy**
   - Go to Deploy tab
   - Click "Deploy Branch"

6. **Run Migrations**
   - Click "More" → "Run console"
   - Enter: `cd backend && python manage.py migrate`

7. **Collect Static Files**
   - Enter: `cd backend && python manage.py collectstatic --noinput`

---

### Local Development

#### Prerequisites
- Python 3.12+
- Node.js 18+
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
venv\Scripts\activate  # Windows
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Run Migrations**
```bash
python manage.py migrate
```

5. **Run Server**
```bash
python manage.py runserver
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

### Forking the Repository

1. Go to [GitHub Repository](https://github.com/SteveDok22/tradesim-pro)
2. Click "Fork" button
3. Clone your forked repository

### Cloning the Repository
```bash
git clone https://github.com/YOUR-USERNAME/tradesim-pro.git
cd tradesim-pro
```

---

## Credits

For detailed code attribution, see [CODE_ATTRIBUTION.md](docs/CODE_ATTRIBUTION.md)

### Quick Summary

| Category | Source |
|----------|--------|
| Backend Framework | [Django 5.0](https://docs.djangoproject.com/) |
| API Framework | [Django REST Framework](https://www.django-rest-framework.org/) |
| Authentication | [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/) |
| Charts | [TradingView Widgets](https://www.tradingview.com/widget/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Crypto Prices | [Binance API](https://binance-docs.github.io/apidocs/) |
| Stock/Forex Prices | [Alpha Vantage](https://www.alphavantage.co/documentation/) |

### Acknowledgements

- **Code Institute** - For the learning materials and project guidelines
- **My Mentor** - For guidance and feedback throughout the project
- **Slack Community** - For support and troubleshooting help

---

<div align="center">

**Developed by Stiven** | [GitHub](https://github.com/SteveDok22) | 2025

</div>