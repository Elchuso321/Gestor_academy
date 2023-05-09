from rest_framework.serializers import ModelSerializer
from academia.models import Academia,Curso,Evento,Alumno,Profesor,Boletin


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
    class Meta:
        model = Alumno
        fields = '__all__'
class ProfesorSerializer(ModelSerializer):
    class Meta:
        model = Profesor
        fields = '__all__'
class BoletinSerializer(ModelSerializer):
    class Meta:
        model = Boletin
        fields = '__all__'
