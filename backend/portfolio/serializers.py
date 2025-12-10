from rest_framework import serializers
from .models import Portfolio, Watchlist
from trading.serializers import AssetSerializer


class PortfolioSerializer(serializers.ModelSerializer):
    """Serializer for Portfolio model."""
    
    username = serializers.CharField(source='user.username', read_only=True)
    account_balance = serializers.DecimalField(
        source='user.account_balance',
        max_digits=12,
        decimal_places=2,
        read_only=True
    )
    
    class Meta:
        model = Portfolio
        fields = [
            'username',
            'account_balance',
            'total_pnl',
            'total_pnl_percent',
            'win_rate',
            'total_trades',
            'winning_trades',
            'losing_trades',
            'updated_at',
        ]
        
class WatchlistSerializer(serializers.ModelSerializer):
    """Serializer for Watchlist model."""
    
    asset = AssetSerializer(read_only=True)
    asset_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Watchlist
        fields = ['id', 'asset', 'asset_id', 'added_at']
        read_only_fields = ['id', 'added_at']


class AddToWatchlistSerializer(serializers.Serializer):
    """Serializer for adding asset to watchlist."""
    
    asset_id = serializers.IntegerField()        