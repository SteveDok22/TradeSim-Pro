from django.contrib import admin
from .models import Portfolio, Watchlist


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_pnl', 'win_rate', 'total_trades']


@admin.register(Watchlist)
class WatchlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'asset', 'added_at']