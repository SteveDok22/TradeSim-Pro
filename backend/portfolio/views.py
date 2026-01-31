from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

from .models import Portfolio, Watchlist
from .serializers import (
    PortfolioSerializer,
    WatchlistSerializer,
    AddToWatchlistSerializer,
)
from trading.models import Asset, Trade
from trading.services.price_service import PriceService


class PortfolioView(APIView):
    """
    GET /api/portfolio/
    Get current user's portfolio statistics.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Get or create portfolio
        portfolio, created = Portfolio.objects.get_or_create(user=user)

        # Update stats
        portfolio.update_stats()

        serializer = PortfolioSerializer(portfolio)
        return Response(serializer.data)


class PortfolioSummaryView(APIView):
    """
    GET /api/portfolio/summary/
    Get detailed portfolio summary with open positions value.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Get portfolio
        portfolio, created = Portfolio.objects.get_or_create(user=user)
        portfolio.update_stats()

        # Get open positions
        open_trades = Trade.objects.filter(user=user, status='OPEN')

        # Calculate total open positions value
        price_service = PriceService(
            alpha_vantage_key=settings.ALPHA_VANTAGE_KEY
        )

        total_open_value = 0
        total_unrealized_pnl = 0

        for trade in open_trades:
            current_price = price_service.get_price(trade.asset.symbol)
            if current_price:
                position_value = trade.quantity * current_price
                total_open_value += position_value

                pnl, _ = trade.calculate_pnl(current_price)
                total_unrealized_pnl += pnl

        # Total equity = balance + open positions value
        total_equity = user.account_balance + total_open_value

        return Response({
            'account_balance': str(user.account_balance),
            'open_positions_value': str(round(total_open_value, 2)),
            'total_equity': str(round(total_equity, 2)),
            'unrealized_pnl': str(round(total_unrealized_pnl, 2)),
            'realized_pnl': str(portfolio.total_pnl),
            'total_pnl': str(
                round(portfolio.total_pnl + total_unrealized_pnl, 2)
            ),
            'win_rate': str(portfolio.win_rate),
            'total_trades': portfolio.total_trades,
            'winning_trades': portfolio.winning_trades,
            'losing_trades': portfolio.losing_trades,
            'open_trades_count': open_trades.count(),
        })


class WatchlistView(generics.ListAPIView):
    """
    GET /api/portfolio/watchlist/
    Get user's watchlist.
    """
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)


class AddToWatchlistView(APIView):
    """
    POST /api/portfolio/watchlist/add/
    Add asset to watchlist.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddToWatchlistSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        asset_id = serializer.validated_data['asset_id']

        try:
            asset = Asset.objects.get(id=asset_id, is_active=True)
        except Asset.DoesNotExist:
            return Response(
                {'error': 'Asset not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if already in watchlist
        if Watchlist.objects.filter(user=request.user, asset=asset).exists():
            return Response(
                {'error': 'Asset already in watchlist'},
                status=status.HTTP_400_BAD_REQUEST
            )

        watchlist_item = Watchlist.objects.create(
            user=request.user,
            asset=asset
        )

        return Response({
            'message': f'{asset.symbol} added to watchlist',
            'item': WatchlistSerializer(watchlist_item).data
        }, status=status.HTTP_201_CREATED)


class RemoveFromWatchlistView(APIView):
    """
    DELETE /api/portfolio/watchlist/<id>/
    Remove asset from watchlist.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            item = Watchlist.objects.get(id=pk, user=request.user)
            symbol = item.asset.symbol
            item.delete()
            return Response({
                'message': f'{symbol} removed from watchlist'
            })
        except Watchlist.DoesNotExist:
            return Response(
                {'error': 'Watchlist item not found'},
                status=status.HTTP_404_NOT_FOUND
            )