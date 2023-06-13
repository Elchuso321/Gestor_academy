from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

app_name = 'academia'

urlpatterns = [
    path('',TemplateView.as_view(template_name="academia/index.html")),
] 
