from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse
from django.views.generic import TemplateView


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
    # Admin
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/', api_root, name='api-root'),
    path('api/auth/', include('accounts.urls')),
    path('api/trading/', include('trading.urls')),
    path('api/portfolio/', include('portfolio.urls')),
    
    # React frontend - catch all other routes
    re_path(r'^(?!api|admin|static).*$', TemplateView.as_view(template_name='index.html'), name='frontend'),
]