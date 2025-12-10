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