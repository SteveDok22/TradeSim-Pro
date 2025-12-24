from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from decimal import Decimal
from unittest.mock import patch

from .models import Asset, Trade

User = get_user_model()


class AssetModelTest(TestCase):
    """Tests for Asset model."""
    
    def setUp(self):
        """Create test asset."""
        self.asset = Asset.objects.create(
            symbol='BTC',
            name='Bitcoin',
            asset_type='CRYPTO',
            api_source='BINANCE'
        )
    
    def test_asset_creation(self):
        """Test asset is created correctly."""
        self.assertEqual(self.asset.symbol, 'BTC')
        self.assertEqual(self.asset.name, 'Bitcoin')
        self.assertEqual(self.asset.asset_type, 'CRYPTO')
    
    def test_asset_str(self):
        """Test asset string representation."""
        self.assertEqual(str(self.asset), 'BTC - Bitcoin')
    
    def test_asset_is_active_default(self):
        """Test asset is active by default."""
        self.assertTrue(self.asset.is_active)
        
class TradeModelTest(TestCase):
    """Tests for Trade model."""
    
    def setUp(self):
        """Create test user, asset, and trade."""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123'
        )
        self.asset = Asset.objects.create(
            symbol='BTC',
            name='Bitcoin',
            asset_type='CRYPTO',
            api_source='BINANCE'
        )
        self.trade = Trade.objects.create(
            user=self.user,
            asset=self.asset,
            trade_type='BUY',
            quantity=Decimal('0.1'),
            entry_price=Decimal('50000.00'),
            status='OPEN'
        )
    
    def test_trade_creation(self):
        """Test trade is created correctly."""
        self.assertEqual(self.trade.user, self.user)
        self.assertEqual(self.trade.asset, self.asset)
        self.assertEqual(self.trade.trade_type, 'BUY')
        self.assertEqual(self.trade.status, 'OPEN')
    
    def test_position_value(self):
        """Test position value calculation."""
        expected = Decimal('0.1') * Decimal('50000.00')
        self.assertEqual(self.trade.position_value, expected)
    
    def test_calculate_pnl_profit(self):
        """Test PnL calculation with profit."""
        pnl, pnl_percent = self.trade.calculate_pnl(Decimal('55000.00'))
        # (55000 - 50000) * 0.1 = 500
        self.assertEqual(pnl, Decimal('500.00'))
        self.assertEqual(pnl_percent, Decimal('10.00'))        
        
    def test_calculate_pnl_loss(self):
        """Test PnL calculation with loss."""
        pnl, pnl_percent = self.trade.calculate_pnl(Decimal('45000.00'))
        # (45000 - 50000) * 0.1 = -500
        self.assertEqual(pnl, Decimal('-500.00'))
        self.assertEqual(pnl_percent, Decimal('-10.00'))
    
    def test_close_trade(self):
        """Test closing a trade."""
        pnl = self.trade.close_trade(Decimal('55000.00'))
        
        self.assertEqual(self.trade.status, 'CLOSED')
        self.assertEqual(self.trade.exit_price, Decimal('55000.00'))
        self.assertEqual(pnl, Decimal('500.00'))
        self.assertIsNotNone(self.trade.closed_at)    
        
class AssetListViewTest(APITestCase):
    """Tests for asset list endpoint."""
    
    def setUp(self):
        """Create test assets."""
        Asset.objects.create(
            symbol='BTC',
            name='Bitcoin',
            asset_type='CRYPTO',
            api_source='BINANCE'
        )
        Asset.objects.create(
            symbol='ETH',
            name='Ethereum',
            asset_type='CRYPTO',
            api_source='BINANCE'
        )
    
    def test_list_assets(self):
        """Test listing all assets."""
        response = self.client.get('/api/trading/assets/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
    
    def test_list_assets_no_auth_required(self):
        """Test assets endpoint is public."""
        response = self.client.get('/api/trading/assets/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)        
        
class OpenTradeViewTest(APITestCase):
    """Tests for open trade endpoint."""
    
    def setUp(self):
        """Create test user and asset."""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123'
        )
        self.asset = Asset.objects.create(
            symbol='BTC',
            name='Bitcoin',
            asset_type='CRYPTO',
            api_source='BINANCE'
        )
        self.client.force_authenticate(user=self.user)
    
    @patch('trading.views.PriceService')
    def test_open_trade_success(self, mock_price_service):
        """Test successful trade opening."""
        # Mock price service
        mock_instance = mock_price_service.return_value
        mock_instance.get_price.return_value = Decimal('50000.00')
        
        data = {
            'asset_id': self.asset.id,
            'amount_usd': '100.00',
            'trade_type': 'BUY'
        }
        response = self.client.post('/api/trading/trades/open/', data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('trade', response.data)
        self.assertEqual(response.data['trade']['status'], 'OPEN')
    
    @patch('trading.views.PriceService')
    def test_open_trade_insufficient_funds(self, mock_price_service):
        """Test trade with insufficient balance."""
        mock_instance = mock_price_service.return_value
        mock_instance.get_price.return_value = Decimal('50000.00')
        
        data = {
            'asset_id': self.asset.id,
            'amount_usd': '20000.00',  # More than balance
            'trade_type': 'BUY'
        }
        response = self.client.post('/api/trading/trades/open/', data)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
    
    def test_open_trade_unauthenticated(self):
        """Test trade without authentication."""
        self.client.force_authenticate(user=None)
        data = {
            'asset_id': self.asset.id,
            'amount_usd': '100.00',
            'trade_type': 'BUY'
        }
        response = self.client.post('/api/trading/trades/open/', data)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_open_trade_invalid_asset(self):
        """Test trade with non-existent asset."""
        data = {
            'asset_id': 9999,
            'amount_usd': '100.00',
            'trade_type': 'BUY'
        }
        response = self.client.post('/api/trading/trades/open/', data)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)        