from django.conf import settings
from django.db import models
import datetime

class Academia(models.Model):
    nombre=models.CharField(max_length=50)
    def __str__(self):
        return f'{self.nombre}'

class Aula(models.Model):
    nombre=models.CharField(max_length=50)
    academia=academia=models.ForeignKey(Academia, on_delete=models.SET_NULL,null=True,related_name='aula')
    def __str__(self):
        return f'{self.nombre}-{self.academia}'
    class Meta:
        unique_together = ('nombre', 'academia')

class Curso(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    academia=models.ForeignKey(Academia, on_delete=models.SET_NULL,null=True,related_name='cursos')
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ingles=models.BooleanField(default=True,help_text="Marcar si la curso no es de apoyo")
    imagen = models.ImageField(upload_to='cursos/', default='cursos/Libro-de-dibujo.jpg',null=True, blank=True)
    

    def __str__(self):
        return f'{self.nombre}'

    # nombre = models.CharField(max_length=50)
    # apellidos = models.CharField(max_length=50)
    # email = models.EmailField(null=True)
    # evento=models.ManyToManyField(Evento)
    
class Profesor(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    descripcion = models.TextField(null=True,)
    telefono = models.CharField(max_length=9,null=True)
    foto_perfil=models.ImageField(upload_to='profesores/',default='profesores/ProfesorBien.jpg' ,null=True, blank=True)

    def __str__(self):
        return f'{self.usuario.nombre} {self.usuario.primer_apellido}'
   
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
    aula=models.ForeignKey(Aula, null=True,on_delete=models.SET_NULL,related_name='eventos')
    def __str__(self):
        return f'{self.nombre}'
    class Meta:
        unique_together = ('dia_semana', 'hora_inicio', 'aula')

class Alumno(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nombre_padre = models.CharField(max_length=50,null=True,blank=True)
    nombre_madre = models.CharField(max_length=50,null=True,blank=True)
    descripcion=models.TextField(null=True,blank=True)
    telefono_padre = models.CharField(max_length=9,null=True,blank=True)
    telefono_madre = models.CharField(max_length=9,null=True,blank=True)
    fecha_nacimiento = models.DateField(null=True)
    foto_perfil=models.ImageField(upload_to='alumnos/', default='alumnos/alumno.jpeg',null=True, blank=True)
    curso=models.ManyToManyField(Evento,related_name='eventos')
    # academia=models.ForeignKey(Academia, on_delete=models.SET_NULL,null=True,related_name='alumnos')
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
    class Meta:
        unique_together = ('curso', 'trimestre', 'alumno')
