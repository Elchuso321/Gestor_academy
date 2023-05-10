from django.urls import path
from . import views
from academia_api.views import MyTokenObtainPairView,CustomTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
)

urlpatterns = [
    path('', views.getRoutes),

    path('academias/', views.getAcademias),
    path('cursos/', views.getCurso),
    path('eventos/', views.getEvento),
    path('alumnos/', views.getAlumno),
    path('profesores/', views.getProfesor),
    path('boletines/', views.getBoletin),
    path('groups/', views.getGroups),
    
    # path('eventos/', views.getEventos),

    # esto lo cambia
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]