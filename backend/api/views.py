from django.shortcuts import render

# Create your views here.
from django.views import View
from .models import  Profesor
# ,Alumno,Asignatura
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from api.serializers import ProfesorSerializer

class ProfesorViewSet(viewsets.ModelViewSet):
    queryset=Profesor.objects.all()
    serializer_class=ProfesorSerializer

    
# class AlumnoView(View):
#     def get(self,request):
#         alumnos=list(Alumno.objects.values())
#         if len(alumnos)>0:
#             datos={'message':"Success",'alumnos':alumnos}
#         else:
#             datos={'message':"Alumnos not found"}
#         return JsonResponse(datos)
    
#     def post(self,request):
        
#         pass
    
    # def put(self,request):
    #     pass
    
    # def delete(self,request):
    #     pass
    