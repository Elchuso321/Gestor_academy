from rest_framework.serializers import ModelSerializer
from academia.models import Academia,Curso,Evento,Alumno,Profesor,Boletin,Aula
from django.contrib.auth.models import Group
from rest_framework import serializers


from users.models import User

# para crear un profesor




class EventoPropioSerializer(ModelSerializer):
    
    evento=serializers.SerializerMethodField()
    class Meta:
        model = Evento
        fields = '__all__'
    def get_alumno(self, instance):
        return self.requesr.user.usuario.nombre


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class AcademiaSerializer(ModelSerializer):
    class Meta:
        model = Academia
        fields = '__all__'

class UserSerializer(ModelSerializer):
    academia=AcademiaSerializer(read_only=True)
    class Meta:
        model = User
        fields = '__all__'

class CursoSerializer(ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'


class EventoSerializer(ModelSerializer):
    
    class Meta:
        model = Evento
        fields = '__all__'

class EventoSerializerGet(ModelSerializer):
    curso=CursoSerializer(read_only=True)
    class Meta:
        model = Evento
        fields = '__all__'
    
    
class DetalleAlumnoSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    curso=EventoSerializer(read_only=True, many=True)
    class Meta:
        model = Alumno
        fields = '__all__'  # Ajusta los campos según tus necesidades
        
class DetalleProfesorSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    class Meta:
        model = Profesor
        fields = '__all__'  # Ajusta los campos según tus necesidades

class DetalleProfesorSerializer1(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    class Meta:
        model = Profesor
        fields = '__all__'  # Ajusta los campos según tus necesidades
class DetalleCursoSerializer(serializers.ModelSerializer):
    academia=AcademiaSerializer(read_only=True)
    class Meta:
        model = Curso
        fields = '__all__'  # Ajusta los campos según tus necesidades

class DetalleEventoSerializer(serializers.ModelSerializer):
    academia=AcademiaSerializer(read_only=True)
    class Meta:
        model = Evento
        fields = '__all__'  # Ajusta los campos según tus necesidades

class ProfesorSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)

    class Meta:
        model = Profesor
        fields = '__all__'

class ProfesorSerializerCrear(serializers.ModelSerializer):
    usuario = serializers.CharField(source='usuario.username')

    class Meta:
        model = Profesor
        fields = '__all__'

class ProfesorSerializerCrear1(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Profesor
        fields = '__all__'

class AlumnoSerializer(ModelSerializer):
    usuario = UserSerializer(read_only=True)
    curso = EventoSerializer(read_only=True, many=True)
   
    class Meta:
        model = Alumno
        fields = '__all__'


class AlumnoSerializerCrear(ModelSerializer):
    usuario = serializers.CharField(source='usuario.username')
    curso = serializers.ListField(child=serializers.CharField())
    # serializers.CharField()
   
    class Meta:
        model = Alumno
        fields = '__all__'
# class AlumnoSerializer(ModelSerializer):
#     usuario = UserSerializer(read_only=True)
#     rol=serializers.SerializerMethodField()
#     class Meta:
#         model = Alumno
#         fields = '__all__'
#     def get_rol(self, instance):
#         return instance.usuario.groups.all()[0].name



# class ProfesorSerializer(ModelSerializer):
#     usuario = UserSerializer(read_only=True)
#     rol=serializers.SerializerMethodField()
#     class Meta:
#         model = Profesor
#         fields = '__all__'
#     def get_rol(self, instance):
#         return instance.usuario.groups.all()[0].name


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


class AulaSerializer(ModelSerializer):
    class Meta:
        model = Aula
        fields = '__all__'


####################################
    
from rest_framework import serializers
from academia.models import Curso

class CursoSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    archivo_pdf = serializers.FileField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Curso
        fields = '__all__'


# from users.serializers import UserSerializer

# class ProfesorSerializer(ModelSerializer):
#     usuario = UserSerializer()

#     class Meta:
#         model = Profesor
#         fields = ['usuario']

class ProfesorSerializerModificar(serializers.ModelSerializer):
    class Meta:
        model = Profesor
        fields = ['descripcion', 'telefono']

class CursoSerializerModificar(serializers.ModelSerializer):
    # academia=serializers.CharField()
    class Meta:
        model = Curso
        fields = ['nombre', 'descripcion','academia','precio','ingles']


class EventoSerializerModificar(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields =["nombre","descripcion","dia_semana","hora_inicio","hora_fin","curso","profesor","aula"]

class AlumnoSerializerModificar(serializers.ModelSerializer):
    curso = serializers.ListField(child=serializers.CharField())
    class Meta:
        model = Alumno
        fields = ["nombre_padre","nombre_madre","descripcion","telefono_padre","telefono_madre","fecha_nacimiento","curso"]
    # def update(self, instance, validated_data):
    #     cursos_data = validated_data.pop('cursos', None)  # Elimina los datos de 'cursos' del diccionario validated_data
    #     instance = super().update(instance, validated_data)  # Actualiza los datos del alumno

    #     if cursos_data is not None:
    #         instance.cursos.set(Curso.objects.filter(id__in=[curso['id'] for curso in cursos_data]))

    #     return instance