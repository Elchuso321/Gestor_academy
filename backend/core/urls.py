
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
app_name = 'academia'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('academia_api.urls')),
    path('api/user/',include('users.urls')),
    
    # path('api/',include('academia_api.urls',name='academia_api')),
    # path('',include('academia.urls',namespace='academia')),
    
    # # esto es para el login desde react en nuestra api
    # path('api-auth',include('rest_framework.urls',namespace='rest_framework')),
    # # esto es para los tokens
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
