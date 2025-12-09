from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from decimal import Decimal

from .models import Asset, Trade
from .serializers import (
    AssetSerializer,
    AssetPriceSerializer,
    TradeSerializer,
    OpenTradeSerializer,
    CloseTradeSerializer,
)
from .services.price_service import PriceService


class AssetListView(generics.ListAPIView):
    """
    GET /api/trading/assets/
    List all active assets.
    """
    queryset = Asset.objects.filter(is_active=True)
    serializer_class = AssetSerializer
    permission_classes = [AllowAny]


class PriceListView(APIView):
    """
    GET /api/trading/prices/
    Get current prices for all assets.
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        assets = Asset.objects.filter(is_active=True)
        
        # Initialize price service with API key
        price_service = PriceService(
            alpha_vantage_key=settings.ALPHA_VANTAGE_KEY
        )
        
        prices = price_service.get_all_prices(assets)
        
        data = []
        for asset in assets:
            data.append({
                'id': asset.id,
                'symbol': asset.symbol,
                'name': asset.name,
                'asset_type': asset.asset_type,
                'price': str(prices.get(asset.symbol)) if prices.get(asset.symbol) else None,
            })
        
        return Response(data)


class PriceDetailView(APIView):
    """
    GET /api/trading/prices/<symbol>/
    Get current price for a specific asset.
    """
    permission_classes = [AllowAny]
    
    def get(self, request, symbol):
        try:
            asset = Asset.objects.get(symbol=symbol.upper(), is_active=True)
        except Asset.DoesNotExist:
            return Response(
                {'error': f'Asset {symbol} not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        price_service = PriceService(
            alpha_vantage_key=settings.ALPHA_VANTAGE_KEY
        )
        price = price_service.get_price(asset.symbol)
        
        return Response({
            'id': asset.id,
            'symbol': asset.symbol,
            'name': asset.name,
            'asset_type': asset.asset_type,
            'price': str(price) if price else None,
        })