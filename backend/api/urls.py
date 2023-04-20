from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from api.views import ProfesorViewSet

router=routers.DefaultRouter()

router.register(r'profesor',ProfesorViewSet)
# from .views import AlumnoView
urlpatterns = [
    path('',include(router.urls))
    # path('companies/',AlumnoView.as_view(),name='alumno_views'),

]
