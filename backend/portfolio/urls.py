from django.urls import path
from .views import (
    PortfolioView,
    PortfolioSummaryView,
    WatchlistView,
    AddToWatchlistView,
    RemoveFromWatchlistView,
)

urlpatterns = [
    # Portfolio
    path('', PortfolioView.as_view(), name='portfolio'),
    path('summary/', PortfolioSummaryView.as_view(), name='portfolio-summary'),

    # Watchlist
    path('watchlist/', WatchlistView.as_view(), name='watchlist'),
    path('watchlist/add/', AddToWatchlistView.as_view(), name='watchlist-add'),
    path(
        'watchlist/<int:pk>/',
        RemoveFromWatchlistView.as_view(),
        name='watchlist-remove'
    ),
]