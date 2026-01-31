from rest_framework import serializers
from .models import Asset, Trade


class AssetSerializer(serializers.ModelSerializer):
    """Serializer for Asset model."""

    class Meta:
        model = Asset
        fields = [
            'id', 'symbol', 'name', 'asset_type', 'api_source', 'is_active'
        ]


class AssetPriceSerializer(serializers.Serializer):
    """Serializer for asset with current price."""

    id = serializers.IntegerField()
    symbol = serializers.CharField()
    name = serializers.CharField()
    asset_type = serializers.CharField()
    price = serializers.DecimalField(
        max_digits=18, decimal_places=8, allow_null=True
    )


class TradeSerializer(serializers.ModelSerializer):
    """Serializer for Trade model."""

    asset_symbol = serializers.CharField(source='asset.symbol', read_only=True)
    asset_name = serializers.CharField(source='asset.name', read_only=True)
    position_value = serializers.DecimalField(
        max_digits=18, decimal_places=2, read_only=True
    )

    class Meta:
        model = Trade
        fields = [
            'id',
            'asset',
            'asset_symbol',
            'asset_name',
            'trade_type',
            'quantity',
            'entry_price',
            'exit_price',
            'stop_loss',
            'take_profit',
            'pnl',
            'pnl_percent',
            'status',
            'position_value',
            'opened_at',
            'closed_at',
        ]
        read_only_fields = [
            'id', 'quantity', 'entry_price', 'exit_price',
            'pnl', 'pnl_percent', 'status', 'opened_at', 'closed_at'
        ]


class OpenTradeSerializer(serializers.Serializer):
    """Serializer for opening a new trade."""

    asset_id = serializers.IntegerField()
    amount_usd = serializers.DecimalField(max_digits=12, decimal_places=2)
    trade_type = serializers.ChoiceField(
        choices=['BUY', 'SELL'], default='BUY'
    )
    stop_loss = serializers.DecimalField(
        max_digits=18, decimal_places=8, required=False, allow_null=True
    )
    take_profit = serializers.DecimalField(
        max_digits=18, decimal_places=8, required=False, allow_null=True
    )

    def validate_amount_usd(self, value):
        if value < 1:
            raise serializers.ValidationError('Minimum trade amount is $1.00')
        return value


class CloseTradeSerializer(serializers.Serializer):
    """Serializer for closing a trade."""

    trade_id = serializers.IntegerField()