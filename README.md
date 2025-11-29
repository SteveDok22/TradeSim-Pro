# TradeSim Pro - Prop Trading Simulator

![Am I Responsive](docs/responsive-mockup.png)

**Live Site:** [TradeSim Pro on Heroku](https://tradesim-pro-app.herokuapp.com)

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