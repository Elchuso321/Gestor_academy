from rest_framework.serializers import ModelSerializer
from academia.models import Academia,Curso,Evento,Alumno,Profesor,Boletin
from django.contrib.auth.models import Group
from rest_framework import serializers


from users.models import User
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']
class AcademiaSerializer(ModelSerializer):
    class Meta:
        model = Academia
        fields = '__all__'

class CursoSerializer(ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
class EventoSerializer(ModelSerializer):
    class Meta:
        model = Evento
        fields = '__all__'

class AlumnoSerializer(ModelSerializer):
    usuario = UserSerializer(read_only=True)
    rol=serializers.SerializerMethodField()
    class Meta:
        model = Alumno
        fields = '__all__'
    def get_rol(self, instance):
        return instance.usuario.groups.all()[0].name

class ProfesorSerializer(ModelSerializer):
    usuario = UserSerializer(read_only=True)
    rol=serializers.SerializerMethodField()
    class Meta:
        model = Profesor
        fields = '__all__'
    def get_rol(self, instance):
        return instance.usuario.groups.all()[0].name
class BoletinSerializer(ModelSerializer):
    alumno=serializers.SerializerMethodField()
    class Meta:
        model = Boletin
        fields = '__all__'
    def get_alumno(self, instance):
        return instance.alumno.usuario.nombre

class EventoPropioSerializer(ModelSerializer):
    
    evento=serializers.SerializerMethodField()
    class Meta:
        model = Evento
        fields = '__all__'
    def get_alumno(self, instance):
        return self.requesr.user.usuario.nombre