from django.db import models
from django.conf import settings
from decimal import Decimal


class Asset(models.Model):
    """Tradeable asset (crypto, stock, or forex)."""
    
    ASSET_TYPES = [
        ('CRYPTO', 'Cryptocurrency'),
        ('STOCK', 'Stock'),
        ('FOREX', 'Forex'),
    ]
    
    API_SOURCES = [
        ('BINANCE', 'Binance'),
        ('ALPHAVANTAGE', 'Alpha Vantage'),
    ]
    
    symbol = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPES)
    api_source = models.CharField(max_length=15, choices=API_SOURCES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['asset_type', 'symbol']
    
    def __str__(self):
        return f'{self.symbol} - {self.name}'


class Trade(models.Model):
    """User trade (buy/sell position)."""
    
    TRADE_TYPES = [
        ('BUY', 'Buy'),
        ('SELL', 'Sell'),
    ]
    
    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('CLOSED', 'Closed'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='trades'
    )
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='trades'
    )
    trade_type = models.CharField(max_length=4, choices=TRADE_TYPES, default='BUY')
    quantity = models.DecimalField(max_digits=18, decimal_places=8)
    entry_price = models.DecimalField(max_digits=18, decimal_places=8)
    exit_price = models.DecimalField(max_digits=18, decimal_places=8, null=True, blank=True)
    stop_loss = models.DecimalField(max_digits=18, decimal_places=8, null=True, blank=True)
    take_profit = models.DecimalField(max_digits=18, decimal_places=8, null=True, blank=True)
    pnl = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    pnl_percent = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='OPEN')
    opened_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-opened_at']
    
    def __str__(self):
        return f'{self.trade_type} {self.quantity} {self.asset.symbol} @ {self.entry_price}'