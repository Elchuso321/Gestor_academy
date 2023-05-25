from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from academia_api.serialiazers import AcademiaSerializer,CursoSerializer,EventoSerializer,AlumnoSerializer,ProfesorSerializer,BoletinSerializer,GroupSerializer,DetalleProfesorSerializer,UserSerializer,ProfesorSerializerCrear,AlumnoSerializerCrear
from academia.models import Academia,Curso,Evento,Alumno,Profesor,Boletin,Aula
from users.models import User
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from academia_api.serialiazers import AulaSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import Group
from rest_framework import generics, status, views, permissions
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404
from django.http import JsonResponse

# class ProfesorCreateView(APIView):
#     def post(self, request):
#         nombre_usuario = request.data.get('usuario_nombre')

#         try:
#             print("\n\n\n\nVA a funcionar :",nombre_usuario)
#             usuario = User.objects.get(nombre=nombre_usuario)
#             serializer = ProfesorSerializer(data={'usuario': usuario.id, 'descripcion': 'Descripcion valor'})
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist:
#             return Response({'error': 'No se encontró el usuario'}, status=status.HTTP_404_NOT_FOUND)
        
class ProfesorCreateView(generics.CreateAPIView):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializerCrear
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Obtén el nombre del usuario del serializer
        usuario_nombre = serializer.validated_data['usuario']
        print(usuario_nombre,"\n\n\n\n\n\n")
        # Busca el usuario por su nombre
        try:
            print("\n\n HOLA:",usuario_nombre)
            usuario = User.objects.get(nombre=usuario_nombre['username'])
        except User.DoesNotExist:
            return Response(
                {'message': 'El usuario no existe'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Crea el profesor relacionado con el usuario
        profesor = Profesor.objects.create(usuario=usuario)

        # Puedes devolver una respuesta personalizada si lo deseas
        response_data = {
            'message': 'Profesor creado exitosamente',
            'profesor_id': profesor.id
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

class AlumnoCreateView(generics.CreateAPIView):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializerCrear

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Obtén el nombre de usuario y los cursos del serializer
        usuario_nombre = serializer.validated_data['usuario']

        curso_id = serializer.validated_data['curso']

        # Busca el usuario por su nombre de usuario
        try:
            usuario = User.objects.get(username=usuario_nombre['username'])
        except User.DoesNotExist:
            return Response(
                {'message': 'El usuario no existe'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Itera sobre la lista de IDs de cursos y vincula cada curso al alumno
        try:
            print("\n\n id_curdo",curso_id)
            curso = Evento.objects.get(id=curso_id)
            alumno = Alumno.objects.create(usuario=usuario)
            alumno.curso.add(curso)
        except Evento.DoesNotExist:
            return Response(
                {'message': 'El curso no existe'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Puedes devolver una respuesta personalizada si lo deseas
        response_data = {
            'message': 'Alumno creado exitosamente',
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    
# class AlumnoCreateView(generics.CreateAPIView):
#     queryset = Alumno.objects.all()
#     serializer_class = AlumnoSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         print("\n\n PERRO")
#         # Obtén el nombre de usuario y el curso del serializer
#         usuario_nombre = serializer.validated_data['usuario']['username']
#         curso_id = serializer.validated_data['curso']
#         print("\n\n\n CURSO",curso_id)

#         # Busca el usuario por su nombre de usuario
#         try:
#             usuario = User.objects.get(username=usuario_nombre)
#         except User.DoesNotExist:
#             return Response(
#                 {'message': 'El usuario no existe'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # Busca el curso por su ID
#         try:
#             curso = Evento.objects.get(id=curso_id)
#         except Evento.DoesNotExist:
#             return Response(
#                 {'message': 'El curso no existe'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # Crea el alumno relacionado con el usuario y el curso
#         alumno = Alumno.objects.create(usuario=usuario)
#         alumno.curso.add(curso)

#         # Puedes devolver una respuesta personalizada si lo deseas
#         response_data = {
#             'message': 'Alumno creado exitosamente',
#             'alumno_id': alumno.id
#         }
#         return Response(response_data, status=status.HTTP_201_CREATED)
    
# class AlumnoCreateView(generics.CreateAPIView):
#     queryset = Alumno.objects.all()
#     serializer_class = AlumnoSerializer
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         # Obtén el nombre del usuario del serializer
#         usuario_nombre = serializer.validated_data['usuario']

#         # Busca el usuario por su nombre
#         try:
#             print("\n\n HOLA:",usuario_nombre)
#             usuario = User.objects.get(nombre=usuario_nombre['username'])
#         except User.DoesNotExist:
#             return Response(
#                 {'message': 'El usuario no existe'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # Crea el profesor relacionado con el usuario
#         alumno = Alumno.objects.create(usuario=usuario)

#         # Puedes devolver una respuesta personalizada si lo deseas
#         response_data = {
#             'message': 'Alumno creado exitosamente',
#             'alumno_id': alumno.id
#         }
#         return Response(response_data, status=status.HTTP_201_CREATED)
    
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)

    #     # Obtén el nombre del usuario del serializer
    #     usuario_nombre = serializer.validated_data['usuario']

    #     # Busca el usuario por su nombre
    #     try:
    #         print("\n\n HOLA:",usuario_nombre)
    #         usuario = User.objects.get(username=usuario_nombre)
    #     except User.DoesNotExist:
    #         return Response(
    #             {'message': 'El usuario no existe'},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )

    #     # Crea el profesor relacionado con el usuario
    #     profesor = Profesor.objects.create(usuario=usuario)

    #     # Puedes devolver una respuesta personalizada si lo deseas
    #     response_data = {
    #         'message': 'Profesor creado exitosamente',
    #         'profesor_id': profesor
    #     }
    #     return Response(response_data, status=status.HTTP_201_CREATED)

# class ProfesorCreateView(generics.CreateAPIView):
#     queryset = Profesor.objects.all()
#     serializer_class = ProfesorSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         profesor = serializer.save()

#         # Puedes devolver una respuesta personalizada si lo deseas
#         response_data = {
#             'message': 'Profesor creado exitosamente',
#             'profesor_id': profesor.id
#         }
#         return Response(response_data, status=status.HTTP_201_CREATED)



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['group'] = user.groups.first().name
        # token['name']=user.nombre
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         email = attrs.get("email")
#         password = attrs.get("password")

#         if email and password:
#             user = authenticate(
#                 request=self.context.get("request"),
#                 username=email,
#                 password=password,
#             )
#             if not user:
#                 msg = _("No se pudo autenticar con las credenciales proporcionadas.")
#                 raise serializers.ValidationError(msg, code="authorization")
#         else:
#             msg = _("Las credenciales de autenticación no fueron proporcionadas.")
#             raise serializers.ValidationError(msg, code="authorization")

#         refresh = self.get_token(user)
#         data = {
#             "refresh": str(refresh),
#             "access": str(refresh.access_token),
#         }
#         return data

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # Add custom claims
#         token['username'] = user.username
#         # ...

#         return token




# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def getAcademias(request):
#     user = request.user
#     # esta parte no la entiendo
#     # academia = user.academia_set.all()
#     academia=Academia.objects.all()
#     serializer = AcademiaSerializer(academia, many=True)
#     return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def getCurso(request):
    user = request.user
    
    if request.method == 'GET':
        curso = Curso.objects.all()
        serializer = CursoSerializer(curso, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CursoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)  # 201: Created
        return Response(serializer.errors, status=400)  # 400: Bad Request

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getCurso(request):
#     user = request.user
#     curso=Curso.objects.all()
#     serializer = CursoSerializer(curso, many=True)
#     return Response(serializer.data)

# @api_view(['GET', 'POST'])
# @permission_classes([AllowAny])
# def getEvento(request):
#     user = request.user
#     academia = user.academia_set.first()  # Obtener la academia del usuario

#     if request.method == 'POST':
#         serializer = EventoSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(academia=academia)  # Asignar la academia al evento
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     eventos = Evento.objects.filter(curso__academia=academia)  # Filtrar eventos por academia
#     serializer = EventoSerializer(eventos, many=True)
#     return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getEvento(request):
    if request.method == 'POST':
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    eventos = Evento.objects.all()
    serializer = EventoSerializer(eventos, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getEvento(request):
#     user = request.user
#     # esta parte no la entiendo
#     # academia = user.academia_set.all()
#     evento=Evento.objects.all()
#     serializer = EventoSerializer(evento, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAlumno(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    alumno=Alumno.objects.all()
    serializer = AlumnoSerializer(alumno, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfesor(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    profesor=Profesor.objects.all()
    serializer = ProfesorSerializer(profesor, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBoletin(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    boletin=Boletin.objects.all()
    serializer = BoletinSerializer(boletin, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getGroups(request):
    user = request.user
    # esta parte no la entiendo
    # academia = user.academia_set.all()
    grupo=Group.objects.all()
    serializer = GroupSerializer(grupo, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getAcademias(request):
    if request.method == 'GET':
        academia = Academia.objects.all()
        serializer = AcademiaSerializer(academia, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = AcademiaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getAulas(request):
    if request.method == 'GET':
        aulas = Aula.objects.all()
        serializer = AulaSerializer(aulas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AulaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get(request):
#     user = request.user
#     # esta parte no la entiendo
#     # academia = user.academia_set.all()
#     academia=.objects.all()
#     serializer = Serializer(academia, many=True)
#     return Response(serializer.data)




###########################################################3


from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from academia.models import Curso
from academia_api.serialiazers import CursoSerializer

class CursoImagenView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, pk):
        curso = Curso.objects.get(pk=pk)
        serializer = CursoSerializer(curso, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@permission_classes([IsAuthenticated])
def obtener_detalle_profesor(request, pk):
    profesor = get_object_or_404(Profesor, id=pk)
    serializer = DetalleProfesorSerializer(profesor)
    return JsonResponse(serializer.data)

# @permission_classes([IsAuthenticated])
# def obtener_detalle_profesor(request, pk):
#     profesor = get_object_or_404(Profesor, id=pk)
#     serializer = DetalleProfesorSerializer(profesor)
#     return JsonResponse(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_detalle_usuario(request, pk):
    usuario = get_object_or_404(User, id=pk)
    serializer = UserSerializer(usuario)
    return Response(serializer.data)