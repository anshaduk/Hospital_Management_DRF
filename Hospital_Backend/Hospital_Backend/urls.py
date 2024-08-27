
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings

#swagger
from drf_spectacular.views import SpectacularAPIView,SpectacularSwaggerView, SpectacularRedocView 




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('App.urls')),

    #swagger URLs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
