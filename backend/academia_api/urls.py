from django.urls import path
from . import views
from academia_api.views import CustomTokenObtainPairView
from academia_api.views import CursoImagenView
from .views import ProfesorCreateView,AlumnoCreateView,ProfesorUpdateView,update_profesor,update_clase,update_evento,update_alumno
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.getRoutes),
    path('crear/profesor/', ProfesorCreateView.as_view()),
    path('crear/alumno/', AlumnoCreateView.as_view()),
    path('asignar/academia/',views.modificar_academia_usuario ),
    
    path('academias/', views.getAcademias),
    path('cursos/', views.getCurso),
    path('eventos/', views.crearEvento),
    path('alumnos/', views.getAlumno),
    path('profesores/', views.getProfesor),
    path('boletines/', views.getBoletin),
    path('groups/', views.getGroups),
    path('aulas/', views.getAulas),
    path('cursos/<int:pk>/imagen/', CursoImagenView.as_view(), name='curso-imagen'),
    path('profesor/<int:pk>/', views.obtener_detalle_profesor, name='detalle_profesor'),
    path('alumno/<int:pk>/', views.obtener_detalle_alumno, name='detalle_alumno'),
    # path('alumno/<int:pk>/', views.obtener_detalle_alumno, name='detalle_profesor'),
    path('usuario/<int:pk>/', views.obtener_detalle_usuario, name='detalle_usuario'),
    path('clase/<int:pk>/', views.obtener_detalle_clase, name='detalle_clase'),
    path('evento/<int:pk>/', views.obtener_detalle_evento, name='detalle_evento'),
    # path('/profesor/:id', views.getAcademias),

    # path('eventos/', views.getEventos),
    # path('users/update/<int:pk>/', update_user, name='user-update'),
    path('profesores/update/<int:pk>/', update_profesor, name='profesor-update'),

    path('alumnos/update/<int:pk>/', update_alumno, name='alumno-update'),
    path('clase/update/<int:pk>/', update_clase, name='clase-update'),
    path('evento/update/<int:pk>/', update_evento, name='evento-update'),

    # path('profesores/update/<int:pk>/', ProfesorUpdateView.as_view(), name='profesor-update'),


    path('profesores/<int:pk>/update/', ProfesorUpdateView.as_view(), name='profesor-update'),
    # esto lo cambia
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

