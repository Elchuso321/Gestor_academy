from django.conf import settings
from django.db import models
import datetime

class Academia(models.Model):
    nombre=models.CharField(max_length=50)
    def __str__(self):
        return f'{self.nombre}'
class Asignatura(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    academia=models.ForeignKey(Academia, on_delete=models.CASCADE,null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    def __str__(self):
        return f'{self.nombre}'

class Evento(models.Model):
    DIA_CHOICES = [
        ('L', 'Lunes'),
        ('M', 'Martes'),
        ('X', 'Miércoles'),
        ('J', 'Jueves'),
        ('V', 'Viernes'),
        ('S', 'Sábado'),
        ('D', 'Domingo'),
    ]
    dia = models.CharField(max_length=1, choices=DIA_CHOICES)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    # horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.nombre}'
    
class Alumno(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)    
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    email = models.EmailField(null=True)
    asignaturas=models.ManyToManyField(Asignatura)
    clases=models.ManyToManyField(Evento)
    def __str__(self):
        return f'{self.nombre} {self.apellidos}'
    
class Profesor(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    email = models.EmailField(null=True)
    asignaturas=models.ManyToManyField(Asignatura)
    def __str__(self):
        return f'{self.nombre} {self.apellidos}'
    

class Horario(models.Model):
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
    eventos = models.ManyToManyField(Evento, related_name='horarios')
    def __str__(self):
        return f'{self.asignatura}'







# from django.conf import settings
# from django.db import models
# import datetime

# class Academia(models.Model):
#     nombre=models.CharField(max_length=50)
#     def __str__(self):
#         return f'{self.nombre}'
# class Asignatura(models.Model):
#     nombre = models.CharField(max_length=50)
#     descripcion = models.TextField()
#     academia=models.ForeignKey(Academia, on_delete=models.CASCADE,null=True)
#     def __str__(self):
#         return f'{self.nombre}'
# class Profesor(models.Model):
#     usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     nombre = models.CharField(max_length=50)
#     apellidos = models.CharField(max_length=50)
#     email = models.EmailField(null=True)
#     asignaturas=models.ManyToManyField(Asignatura)
#     def __str__(self):
#         return f'{self.nombre} {self.apellidos}'
    
# class Alumno(models.Model):
#     usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)    
#     nombre = models.CharField(max_length=50)
#     apellidos = models.CharField(max_length=50)
#     email = models.EmailField(null=True)
#     asignaturas=models.ManyToManyField(Asignatura)
#     def __str__(self):
#         return f'{self.nombre} {self.apellidos}'

# class Evento(models.Model):
#     DIA_CHOICES = [
#         ('L', 'Lunes'),
#         ('M', 'Martes'),
#         ('X', 'Miércoles'),
#         ('J', 'Jueves'),
#         ('V', 'Viernes'),
#         ('S', 'Sábado'),
#         ('D', 'Domingo'),
#     ]
#     dia = models.CharField(max_length=1, choices=DIA_CHOICES)
#     nombre = models.CharField(max_length=50)
#     descripcion = models.TextField()
#     fecha = models.DateField()
#     hora_inicio = models.TimeField()
#     hora_fin = models.TimeField()
#     # horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
#     def __str__(self):
#         return f'{self.nombre}'

# class Horario(models.Model):
#     asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
#     eventos = models.ManyToManyField(Evento, related_name='horarios')
#     def __str__(self):
#         return f'{self.asignatura}'
