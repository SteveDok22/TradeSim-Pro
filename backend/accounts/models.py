from django.contrib.auth.models import AbstractUser
from django.db import models
from decimal import Decimal

class CustomUser(AbstractUser):
    """
    Custom user model with trading balance.
    """
    
    email = models.EmailField(unique=True)
    
    account_balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal('10000.00'),
        help_text='Virtual trading balance in USD'
    )
    
    TIER_CHOICES = [
        ('BASIC', 'Basic'),
        ('PRO', 'Pro'),
        ('MASTER', 'Master'),
    ]
    
    trading_tier = models.CharField(
        max_length=10,
        choices=TIER_CHOICES,
        default='BASIC',
    )
    
    bio = models.TextField(max_length=500, blank=True)
    
    # Use email for login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']