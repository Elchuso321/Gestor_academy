from django.contrib import admin

# Register your models here.
from academia.models import Alumno,Asignatura
# ,ProfesorAsignatura,AlumnoAsignatura

admin.site.register(Alumno)
admin.site.register(Asignatura)