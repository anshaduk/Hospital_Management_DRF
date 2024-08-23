from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    
    path('verifyemail/',views.VerifyEmail.as_view(),name='verifyemail'),# for email verification
    path('register/',views.RegistrationUser.as_view(),name='register'),
    path('user/',views.UserView.as_view(),name='user'),

    path('doctorgetedit/',views.DoctorGetEditView.as_view(),name='doctorgetedit'),
    path('doctor/',views.DoctorView.as_view(),name='doctor'),#Show all Dr Admin Side
    path('doctor/<int:pk>/',views.DoctorView.as_view(),name='doctordetail'),#update dr in Admin side
    path('admin/',views.AdminView.as_view(),name='Admin view'),
    path('admin/<int:pk>/',views.AdminView.as_view(),name='admin view'),


    path('logout/',views.LogoutView.as_view(),name='logout'),
    path('token/',views.TokenObtainView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
]