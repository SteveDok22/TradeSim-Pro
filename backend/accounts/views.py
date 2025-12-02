from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from .serializers import UserSerializer, RegisterSerializer, BalanceSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration.
    POST /api/auth/register/
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Create tokens for the new user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Registration successful!',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    API endpoint for user profile.
    GET /api/auth/profile/ - Get current user
    PUT /api/auth/profile/ - Update profile
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
class BalanceView(APIView):
    """
    API endpoint for user balance.
    GET /api/auth/balance/
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = BalanceSerializer(request.user)
        return Response(serializer.data)


class ResetBalanceView(APIView):
    """
    API endpoint to reset balance to $10,000.
    POST /api/auth/balance/reset/
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        old_balance = user.account_balance
        user.reset_balance()
        
        return Response({
            'message': 'Balance reset successful!',
            'old_balance': f'${old_balance:,.2f}',
            'new_balance': f'${user.account_balance:,.2f}',
        })    