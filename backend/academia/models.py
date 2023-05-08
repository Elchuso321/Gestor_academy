from django.conf import settings
from django.db import models
import datetime

# hay dos opciones:
#     Curso=>poner horario many to many
#     evento=>poner id de asigntura onetoone o foreing key

class Academia(models.Model):
    nombre=models.CharField(max_length=50)
    def __str__(self):
        return f'{self.nombre}'

class Curso(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    academia=models.ForeignKey(Academia, on_delete=models.SET_NULL,null=True,related_name='cursos')
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ingles=models.BooleanField(default=True,help_text="Marcar si la curso no es de apoyo")
    # horario = models.ManyToManyField(Evento,  ='horarios')

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
    dia_semana = models.CharField(max_length=1, choices=DIA_CHOICES)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True)
    # fecha = models.DateField(blank=True) para un evento en particular es mejor separarlo
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    curso = models.ForeignKey(Curso, null=True,on_delete=models.CASCADE,related_name='eventos')
    profesor=models.ForeignKey('Profesor', null=True,on_delete=models.SET_NULL,related_name='eventos')
    def __str__(self):
        return f'{self.nombre}'
    
class Alumno(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)    
    # nombre = models.CharField(max_length=50)
    # primer_apellido = models.CharField(max_length=50)
    # segundo_apellido = models.CharField(max_length=50)
    # email = models.EmailField(null=True)
    # curso=models.ManyToManyField(Curso)
    evento=models.ManyToManyField(Evento)
    
    def __str__(self):
        return f'{self.usuario.nombre} {self.usuario.primer_apellido}'
class Profesor(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # nombre = models.CharField(max_length=50)
    # apellidos = models.CharField(max_length=50)
    # email = models.EmailField(null=True)
    # evento=models.ManyToManyField(Evento)
    def __str__(self):
        return f'{self.usuario.nombre} {self.usuario.primer_apellido}'
   
class Boletin(models.Model):
    DIA_CHOICES = [
        ('1', '1er Trimestre'),
        ('2', '2er Trimestre'),
        ('3', '3er Trimestre'),
    ]
    curso=models.ForeignKey(Curso,on_delete=models.CASCADE,null=True,related_name='boletines')
    trimestre= models.CharField(max_length=1, choices=DIA_CHOICES)
    alumno=models.ForeignKey(Alumno,on_delete=models.SET_NULL,null=True,related_name='boletines')
    skill_writing = models.CharField(max_length=50,verbose_name="Writing* / Escritura*")
    skill_reading = models.CharField(max_length=50,verbose_name="Reading* / Lectura*")
    skill_speaking = models.CharField(max_length=50,verbose_name="Speaking / Expresión oral")
    skill_listening = models.CharField(max_length=50,verbose_name="Listening / Comprensión auditiva")
    actitud_interes= models.CharField(max_length=50,verbose_name="Shows interest / Muestra interés")
    actitud_esfuerzo= models.CharField(max_length=50,verbose_name="Makes an effort / Se esfuerza")
    actitud_participa= models.CharField(max_length=50,verbose_name="Participates / Participa en la clase")
    actitud_comportamiento= models.CharField(max_length=50,verbose_name="Good Behaviour /Buen comportamiento")
    comentario=models.TextField(max_length=200)

    def __str__(self):
        return f'{self.curso}-{self.alumno}-{self.trimestre}'
    