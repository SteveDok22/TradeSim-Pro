from django.db import models
from django.conf import settings
from decimal import Decimal


class Portfolio(models.Model):
    """User portfolio statistics."""
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='portfolio'
    )
    total_pnl = models.DecimalField(max_digits=18, decimal_places=2, default=Decimal('0.00'))
    win_rate = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.00'))
    total_trades = models.IntegerField(default=0)
    winning_trades = models.IntegerField(default=0)
    losing_trades = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Portfolio of {self.user.username}'