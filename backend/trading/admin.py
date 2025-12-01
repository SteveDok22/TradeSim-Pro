from django.contrib import admin
from .models import Asset, Trade


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ['symbol', 'name', 'asset_type', 'api_source', 'is_active']
    list_filter = ['asset_type', 'api_source', 'is_active']


@admin.register(Trade)
class TradeAdmin(admin.ModelAdmin):
    list_display = ['user', 'asset', 'trade_type', 'quantity', 'entry_price', 'pnl', 'status']
    list_filter = ['status', 'trade_type', 'asset']