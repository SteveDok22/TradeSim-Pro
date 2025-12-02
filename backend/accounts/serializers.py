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
        
class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']
    
    def validate(self, data):
        """Check that passwords match."""
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({
                'password_confirm': 'Passwords do not match.'
            })
        return data
    
    def validate_email(self, value):
        """Check that email is unique."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already registered.')
        return value
    
    def create(self, validated_data):
        """Create new user."""
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user
    
class BalanceSerializer(serializers.ModelSerializer):
    """Serializer for user balance."""
    
    formatted_balance = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['account_balance', 'formatted_balance']
    
    def get_formatted_balance(self, obj):
        return f'${obj.account_balance:,.2f}'    