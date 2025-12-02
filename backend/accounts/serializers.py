from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user data."""
    
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'account_balance',
            'trading_tier',
            'bio',
            'date_joined',
        ]
        read_only_fields = ['id', 'account_balance', 'trading_tier', 'date_joined']