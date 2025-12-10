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
        
class OpenTradeView(APIView):
    """
    POST /api/trading/trades/open/
    Open a new trade position.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = OpenTradeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        user = request.user
        
        # Get asset
        try:
            asset = Asset.objects.get(id=data['asset_id'], is_active=True)
        except Asset.DoesNotExist:
            return Response(
                {'error': 'Asset not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get current price
        price_service = PriceService(
            alpha_vantage_key=settings.ALPHA_VANTAGE_KEY
        )
        current_price = price_service.get_price(asset.symbol)
        
        if not current_price:
            return Response(
                {'error': 'Could not fetch current price'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        amount_usd = Decimal(str(data['amount_usd']))
        
        # Check balance
        if amount_usd > user.account_balance:
            return Response(
                {'error': f'Insufficient funds. Available: ${user.account_balance}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Calculate quantity
        quantity = amount_usd / current_price
        
        # Create trade
        trade = Trade.objects.create(
            user=user,
            asset=asset,
            trade_type=data['trade_type'],
            quantity=quantity,
            entry_price=current_price,
            stop_loss=data.get('stop_loss'),
            take_profit=data.get('take_profit'),
            status='OPEN',
        )
        
        # Deduct from balance
        user.account_balance -= amount_usd
        user.save()
        
        return Response({
            'message': 'Trade opened successfully!',
            'trade': TradeSerializer(trade).data,
            'new_balance': str(user.account_balance),
        }, status=status.HTTP_201_CREATED)        
        
class CloseTradeView(APIView):
    """
    POST /api/trading/trades/close/
    Close an existing trade position.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = CloseTradeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        trade_id = serializer.validated_data['trade_id']
        user = request.user
        
        # Get trade
        try:
            trade = Trade.objects.get(id=trade_id, user=user, status='OPEN')
        except Trade.DoesNotExist:
            return Response(
                {'error': 'Trade not found or already closed'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get current price
        price_service = PriceService(
            alpha_vantage_key=settings.ALPHA_VANTAGE_KEY
        )
        current_price = price_service.get_price(trade.asset.symbol)
        
        if not current_price:
            return Response(
                {'error': 'Could not fetch current price'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        # Close trade and calculate PnL
        pnl = trade.close_trade(current_price)
        
        # Return position value + PnL to balance
        position_value = trade.quantity * trade.entry_price
        return_amount = position_value + pnl
        user.account_balance += return_amount
        user.save()
        
        return Response({
            'message': 'Trade closed successfully!',
            'trade': TradeSerializer(trade).data,
            'pnl': str(pnl),
            'new_balance': str(user.account_balance),
        })        