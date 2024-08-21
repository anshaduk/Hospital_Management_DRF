from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('home/',views.HomeView.as_view(),name='home'),
    path('logout/',views.LogoutView.as_view(),name='logout'),
    path('token/',views.LoginView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
]