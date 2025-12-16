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

