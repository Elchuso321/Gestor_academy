from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
###########
from .views import AlumnoDetail,AlumnoList

app_name = 'blog_api'


urlpatterns = [
    # para ver un elemento de la lista
    path('<int:pk>',AlumnoDetail.as_view(),name="detailcreate"),
    # para ver todos los elementos de la lista
    path('',AlumnoList.as_view(),name="listcreate"),

]
