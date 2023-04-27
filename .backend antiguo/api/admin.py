from django.contrib import admin

from .models import Profesor
from .models import Alumno,Asignatura,Horario,Evento
from .models import Academia
# ,ProfesorAsignatura,AlumnoAsignatura

admin.site.register(Profesor)
admin.site.register(Alumno)
admin.site.register(Asignatura)
admin.site.register(Horario)
admin.site.register(Evento)
admin.site.register(Academia)
# admin.site.register(ProfesorAsignatura)
# admin.site.register(AlumnoAsignatura)

# admin.site.register()