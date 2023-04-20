from django.contrib import admin

from .models import Profesor
from .models import Alumno,Asignatura,Horario,Evento
# Register your models here.

admin.site.register(Profesor)
admin.site.register(Alumno)
admin.site.register(Asignatura)
admin.site.register(Horario)
admin.site.register(Evento)