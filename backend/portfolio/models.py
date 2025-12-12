from django.db import models
from django.conf import settings
from decimal import Decimal


class Portfolio(models.Model):
    """
    User portfolio statistics.
    """
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='portfolio'
    )
    total_pnl = models.DecimalField(max_digits=18, decimal_places=2, default=Decimal('0.00'))
    total_pnl_percent = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    win_rate = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.00'))
    total_trades = models.IntegerField(default=0)
    winning_trades = models.IntegerField(default=0)
    losing_trades = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Portfolio of {self.user.username}'
    
    def update_stats(self):
        """Recalculate portfolio statistics."""
        from trading.models import Trade
        
        closed_trades = Trade.objects.filter(user=self.user, status='CLOSED')
        
        self.total_trades = closed_trades.count()
        self.winning_trades = closed_trades.filter(pnl__gt=0).count()
        self.losing_trades = closed_trades.filter(pnl__lt=0).count()
        
        # Calculate total PnL
        total = sum(t.pnl or 0 for t in closed_trades)
        self.total_pnl = total
        
        # Calculate win rate
        if self.total_trades > 0:
            self.win_rate = (self.winning_trades / self.total_trades) * 100
        else:
            self.win_rate = Decimal('0.00')
        
        # Calculate PnL percent
        initial_balance = Decimal('10000.00')
        self.total_pnl_percent = (self.total_pnl / initial_balance) * 100
        
        self.save()


class Watchlist(models.Model):
    """
    User watchlist for tracking assets.
    """
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='watchlist'
    )
    asset = models.ForeignKey(
        'trading.Asset',
        on_delete=models.CASCADE,
        related_name='watchlist_items'
    )
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'asset']
        ordering = ['-added_at']
    
    def __str__(self):
        return f'{self.user.username} watching {self.asset.symbol}'