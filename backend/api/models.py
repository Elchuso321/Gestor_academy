from django.db import models
import datetime


class Profesor(models.Model):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    email = models.EmailField(null=True)

    def __str__(self):
        return f'{self.nombre} {self.apellidos}'
from django.db import models

class Alumno(models.Model):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    correo_electronico = models.EmailField(null=True)


class Asignatura(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()

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
class Horario(models.Model):
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
    eventos = models.ManyToManyField(Evento, related_name='horarios')

class Matricula(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)

class ProfesorAsignatura(models.Model):
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
