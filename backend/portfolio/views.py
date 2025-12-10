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