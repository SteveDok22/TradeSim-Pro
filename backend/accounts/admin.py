from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'account_balance', 'trading_tier', 'is_active']
    list_filter = ['trading_tier', 'is_active']
    search_fields = ['username', 'email']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Trading Info', {'fields': ('account_balance', 'trading_tier', 'bio')}),
    )