from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from academia_api.serialiazers import AcademiaSerializer,CursoSerializer,EventoSerializer,AlumnoSerializer,ProfesorSerializer,BoletinSerializer,GroupSerializer
from academia.models import Academia,Curso,Evento,Alumno,Profesor,Boletin
from users.models import User
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import Group
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['group'] = user.groups.first().name
        # token['name']=user.nombre
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"),
                username=email,
                password=password,
            )
            if not user:
                msg = _("No se pudo autenticar con las credenciales proporcionadas.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _("Las credenciales de autenticación no fueron proporcionadas.")
            raise serializers.ValidationError(msg, code="authorization")

        refresh = self.get_token(user)
        data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        return data

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # Add custom claims
#         token['username'] = user.username
#         # ...

#         return token




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)


@api_view(['GET'])
@permission_classes([AllowAny])
def getAcademias(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    academia=Academia.objects.all()
    serializer = AcademiaSerializer(academia, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getCurso(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    curso=Curso.objects.all()
    serializer = CursoSerializer(curso, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getEvento(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    evento=Evento.objects.all()
    serializer = EventoSerializer(evento, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getAlumno(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    alumno=Alumno.objects.all()
    serializer = AlumnoSerializer(alumno, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getProfesor(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    profesor=Profesor.objects.all()
    serializer = ProfesorSerializer(profesor, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getBoletin(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    boletin=Boletin.objects.all()
    serializer = BoletinSerializer(boletin, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getGroups(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    grupo=Group.objects.all()
    serializer = GroupSerializer(grupo, many=True)
    return Response(serializer.data)




# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get(request):
#     user = request.user
#     # esta parte no la entiendo
#     # academia = user.academia_set.all()
#     academia=.objects.all()
#     serializer = Serializer(academia, many=True)
#     return Response(serializer.data)
