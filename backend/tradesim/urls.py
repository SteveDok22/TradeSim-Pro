from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def api_root(request):
    """API root with available endpoints."""
    return JsonResponse({
        'message': 'Welcome to TradeSim Pro API',
        'version': '1.0.0',
        'endpoints': {
            'auth': {
                'register': '/api/auth/register/',
                'login': '/api/auth/login/',
                'logout': '/api/auth/logout/',
                'profile': '/api/auth/profile/',
                'balance': '/api/auth/balance/',
            },
            'trading': {
                'assets': '/api/trading/assets/',
                'prices': '/api/trading/prices/',
                'open_trade': '/api/trading/trades/open/',
                'close_trade': '/api/trading/trades/close/',
                'positions': '/api/trading/trades/positions/',
                'history': '/api/trading/trades/history/',
            },
            'portfolio': {
                'stats': '/api/portfolio/',
                'summary': '/api/portfolio/summary/',
                'watchlist': '/api/portfolio/watchlist/',
            },
        }
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/auth/', include('accounts.urls')),
    path('api/trading/', include('trading.urls')),
    path('api/portfolio/', include('portfolio.urls')),
]