from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from decimal import Decimal

from .models import Portfolio, Watchlist
from trading.models import Asset, Trade

User = get_user_model()


class PortfolioModelTest(TestCase):
    """Tests for Portfolio model."""
    
    def setUp(self):
        """Create test user and portfolio."""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123'
        )
        self.portfolio = Portfolio.objects.create(user=self.user)
        self.asset = Asset.objects.create(
            symbol='BTC',
            name='Bitcoin',
            asset_type='CRYPTO',
            api_source='BINANCE'
        )
    
    def test_portfolio_creation(self):
        """Test portfolio is created correctly."""
        self.assertEqual(self.portfolio.user, self.user)
        self.assertEqual(self.portfolio.total_pnl, Decimal('0.00'))
        self.assertEqual(self.portfolio.win_rate, Decimal('0.00'))
    
    def test_portfolio_str(self):
        """Test portfolio string representation."""
        self.assertEqual(str(self.portfolio), 'Portfolio of testuser')
    
    def test_update_stats(self):
        """Test updating portfolio statistics."""
        # Create winning trade
        Trade.objects.create(
            user=self.user,
            asset=self.asset,
            trade_type='BUY',
            quantity=Decimal('0.1'),
            entry_price=Decimal('50000.00'),
            exit_price=Decimal('55000.00'),
            pnl=Decimal('500.00'),
            status='CLOSED'
        )
        # Create losing trade
        Trade.objects.create(
            user=self.user,
            asset=self.asset,
            trade_type='BUY',
            quantity=Decimal('0.1'),
            entry_price=Decimal('50000.00'),
            exit_price=Decimal('48000.00'),
            pnl=Decimal('-200.00'),
            status='CLOSED'
        )
        
        self.portfolio.update_stats()
        
        self.assertEqual(self.portfolio.total_trades, 2)
        self.assertEqual(self.portfolio.winning_trades, 1)
        self.assertEqual(self.portfolio.losing_trades, 1)
        self.assertEqual(self.portfolio.total_pnl, Decimal('300.00'))
        self.assertEqual(self.portfolio.win_rate, Decimal('50.00'))