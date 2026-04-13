from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserProfileView

urlpatterns = [
    # Sign Up
    path('register/', RegisterView.as_view(), name='register'),
    
    # User Profile
    path('profile/', UserProfileView.as_view(), name='profile'),
    
    # Login (returns Access & Refresh tokens)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh Token
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]