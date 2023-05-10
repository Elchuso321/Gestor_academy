from django.contrib import admin

# Register your models here.
from academia.models import Academia,Curso,Evento,Alumno,Profesor,Boletin,Aula


admin.site.register(Academia)
admin.site.register(Curso)
admin.site.register(Evento)
admin.site.register(Alumno)
admin.site.register(Profesor)
admin.site.register(Boletin)
admin.site.register(Aula)
#  admin.site.register()