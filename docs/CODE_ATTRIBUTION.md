# Code Attribution & Resources

This section provides comprehensive documentation of all external code, libraries, patterns, and resources used in this project. All code has been properly attributed, understood, adapted, and integrated according to licensing requirements.

---

## Core Frameworks & Libraries

### Django (v5.0.1) - Backend Framework
- **Source:** [Django Documentation](https://docs.djangoproject.com/)
- **License:** BSD 3-Clause License
- **Usage:** Core backend framework for the entire project

#### Code Adaptations:
```python
# Custom User Model pattern from Django documentation
# Used in accounts/models.py lines 1-45
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    account_balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal('10000.00')
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
```
- **Reference:** [Substituting a Custom User Model](https://docs.djangoproject.com/en/5.0/topics/auth/customizing/#substituting-a-custom-user-model)
```python
# DecimalField for financial data from Django documentation
# Used in all models for monetary values
account_balance = models.DecimalField(
    max_digits=12,
    decimal_places=2,
    default=Decimal('10000.00')
)
```
- **Reference:** [Django DecimalField](https://docs.djangoproject.com/en/5.0/ref/models/fields/#decimalfield)
```python
# Model choices pattern from Django documentation
# Used in trading/models.py lines 10-25
ASSET_TYPES = [
    ('CRYPTO', 'Cryptocurrency'),
    ('STOCK', 'Stock'),
    ('FOREX', 'Forex'),
]
asset_type = models.CharField(max_length=10, choices=ASSET_TYPES)
```
- **Reference:** [Django Field Choices](https://docs.djangoproject.com/en/5.0/ref/models/fields/#choices)
```python
# ForeignKey relationships from Django documentation
# Used in trading/models.py lines 40-50
user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='trades'
)
```
- **Reference:** [Django ForeignKey](https://docs.djangoproject.com/en/5.0/ref/models/fields/#foreignkey)
```python
# OneToOneField for Portfolio from Django documentation
# Used in portfolio/models.py lines 10-15
user = models.OneToOneField(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='portfolio'
)
```
- **Reference:** [Django OneToOneField](https://docs.djangoproject.com/en/5.0/ref/models/fields/#onetoonefield)

---

### Django REST Framework (v3.14.0) - API Development
- **Source:** [DRF Documentation](https://www.django-rest-framework.org/)
- **License:** BSD 3-Clause License
- **Usage:** RESTful API endpoints

#### Code Adaptations:
```python
# ModelSerializer pattern from DRF documentation
# Used in accounts/serializers.py lines 8-20
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'account_balance']
        read_only_fields = ['id', 'account_balance']
```
- **Reference:** [DRF Serializers](https://www.django-rest-framework.org/api-guide/serializers/#modelserializer)
```python
# SerializerMethodField from DRF documentation
# Used in accounts/serializers.py lines 35-45
formatted_balance = serializers.SerializerMethodField()

def get_formatted_balance(self, obj):
    return f'${obj.account_balance:,.2f}'
```

- **Reference:** [DRF SerializerMethodField](https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield)
```python
# Password validation in serializer from DRF examples
# Used in accounts/serializers.py lines 15-30
def validate(self, data):
    if data['password'] != data['password_confirm']:
        raise serializers.ValidationError({
            'password_confirm': 'Passwords do not match.'
        })
    return data
```
- **Reference:** [DRF Validators](https://www.django-rest-framework.org/api-guide/validators/)
```python
# Generic views pattern from DRF documentation
# Used in accounts/views.py lines 15-25
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
```
- **Reference:** [DRF Generic Views](https://www.django-rest-framework.org/api-guide/generic-views/)
```python
# APIView pattern from DRF documentation
# Used in trading/views.py lines 30-60
class PriceListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        # Implementation
        return Response(data)
```
- **Reference:** [DRF APIView](https://www.django-rest-framework.org/api-guide/views/#class-based-views)
```python
# Permission classes from DRF documentation
# Used throughout views.py files
permission_classes = [IsAuthenticated]
```
- **Reference:** [DRF Permissions](https://www.django-rest-framework.org/api-guide/permissions/)

---

### Simple JWT (v5.3.1) - JWT Authentication
- **Source:** [SimpleJWT Documentation](https://django-rest-framework-simplejwt.readthedocs.io/)
- **License:** MIT License
- **Usage:** Token-based authentication

#### Code Adaptations:
```python
# JWT token generation from SimpleJWT documentation
# Used in accounts/views.py lines 25-35
from rest_framework_simplejwt.tokens import RefreshToken

refresh = RefreshToken.for_user(user)
return Response({
    'tokens': {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
})
```
- **Reference:** [SimpleJWT Creating Tokens Manually](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/creating_tokens_manually.html)
```python
# JWT settings configuration from SimpleJWT documentation
# Used in tradesim/settings.py lines 85-95
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}
```
- **Reference:** [SimpleJWT Settings](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html)
```python
# Token blacklist for logout from SimpleJWT documentation
# Used in accounts/views.py lines 70-80
from rest_framework_simplejwt.tokens import RefreshToken

def post(self, request):
    refresh_token = request.data.get('refresh')
    token = RefreshToken(refresh_token)
    token.blacklist()
```
- **Reference:** [SimpleJWT Blacklist App](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/blacklist_app.html)

---

### Django CORS Headers (v4.3.1)
- **Source:** [django-cors-headers Documentation](https://github.com/adamchainz/django-cors-headers)
- **License:** MIT License
- **Usage:** Cross-Origin Resource Sharing

#### Code Adaptations:
```python
# CORS configuration from documentation
# Used in tradesim/settings.py lines 100-105
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
CORS_ALLOW_CREDENTIALS = True
```
- **Reference:** [django-cors-headers Configuration](https://github.com/adamchainz/django-cors-headers#configuration)

---
