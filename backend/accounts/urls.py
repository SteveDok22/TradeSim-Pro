from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    RegisterView,
    ProfileView,
    BalanceView,
    ResetBalanceView,
    LogoutView,
)

urlpatterns = [
    # Registration
    path('register/', RegisterView.as_view(), name='register'),

    # Login (JWT tokens)
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Logout
    path('logout/', LogoutView.as_view(), name='logout'),

    # Profile
    path('profile/', ProfileView.as_view(), name='profile'),

    # Balance
    path('balance/', BalanceView.as_view(), name='balance'),
    path('balance/reset/', ResetBalanceView.as_view(), name='balance_reset'),
]