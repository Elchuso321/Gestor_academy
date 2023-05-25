from django.urls import path
from . import views
from academia_api.views import CustomTokenObtainPairView
from academia_api.views import CursoImagenView
from .views import ProfesorCreateView,AlumnoCreateView
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

urlpatterns = [
    path('', views.getRoutes),
    path('crear/profesor/', ProfesorCreateView.as_view()),
    path('crear/alumno/', AlumnoCreateView.as_view()),
    
    path('academias/', views.getAcademias),
    path('cursos/', views.getCurso),
    path('eventos/', views.getEvento),
    path('alumnos/', views.getAlumno),
    path('profesores/', views.getProfesor),
    path('boletines/', views.getBoletin),
    path('groups/', views.getGroups),
    path('aulas/', views.getAulas),
    path('cursos/<int:pk>/imagen/', CursoImagenView.as_view(), name='curso-imagen'),
    path('profesor/<int:pk>/', views.obtener_detalle_profesor, name='detalle_profesor'),
    # path('alumno/<int:pk>/', views.obtener_detalle_alumno, name='detalle_profesor'),
    path('usuario/<int:pk>/', views.obtener_detalle_usuario, name='detalle_usuario'),
    # path('/profesor/:id', views.getAcademias),

    # path('eventos/', views.getEventos),

    # esto lo cambia
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

