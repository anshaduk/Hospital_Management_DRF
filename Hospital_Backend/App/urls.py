from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/',views.RegistrationUser.as_view(),name='register'),
    path('logout/',views.LogoutView.as_view(),name='logout'),
    path('token/',views.TokenObtainView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
]