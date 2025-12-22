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