from django.urls import path
from .views import (
    AssetListView,
    PriceListView,
    PriceDetailView,
    OpenTradeView,
    CloseTradeView,
    OpenPositionsView,
    TradeHistoryView,
)

urlpatterns = [
    # Assets
    path('assets/', AssetListView.as_view(), name='asset-list'),
    
    # Prices
    path('prices/', PriceListView.as_view(), name='price-list'),
    path('prices/<str:symbol>/', PriceDetailView.as_view(), name='price-detail'),
    
    # Trades
    path('trades/open/', OpenTradeView.as_view(), name='trade-open'),
    path('trades/close/', CloseTradeView.as_view(), name='trade-close'),
    path('trades/positions/', OpenPositionsView.as_view(), name='open-positions'),
    path('trades/history/', TradeHistoryView.as_view(), name='trade-history'),
]