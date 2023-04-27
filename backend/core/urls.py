
from django.contrib import admin
from django.urls import path,include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('academia.urls',namespace='academia')),
    path('api/',include('academia_api.urls',namespace='academia_api')),
    path('api/user/',include('users.urls',namespace='users')),
    
    # esto es para el login desde react en nuestra api
    path('api-auth',include('rest_framework.urls',namespace='rest_framework')),
    # esto es para los tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


]
