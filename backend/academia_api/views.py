from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from academia_api.serialiazers import AcademiaSerializer,CursoSerializer,EventoSerializer,AlumnoSerializer,ProfesorSerializer,BoletinSerializer,GroupSerializer,DetalleProfesorSerializer,UserSerializer,ProfesorSerializerCrear,AlumnoSerializerCrear,DetalleAlumnoSerializer,DetalleCursoSerializer,ProfesorSerializerCrear,ProfesorSerializerCrear1,ProfesorSerializerModificar,AlumnoSerializerModificar,DetalleEventoSerializer,EventoSerializerGet,DetalleProfesorSerializer1,CursoSerializerModificar,EventoSerializerModificar
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
from django.views.decorators.csrf import csrf_exempt
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
        print()
        # Obtén el nombre de usuario y los cursos del serializer
        usuario_nombre = serializer.validated_data['usuario']

        cursos = serializer.validated_data['curso']
        print("\n\n\n\n curso",cursos,"\n\n\n\n\n\n")
        # Busca el usuario por su nombre de usuario
        try:
            usuario = User.objects.get(username=usuario_nombre['username'])
            alumno = Alumno.objects.create(usuario=usuario)
        except User.DoesNotExist:
            return Response(
                {'message': 'El usuario no existe'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Itera sobre la lista de IDs de cursos y vincula cada curso al alumno
        try:
            print("CURSOS CREACION ALUMNO",cursos)
            for curso in cursos:
                print("\n\n id_curdo",curso)
                curso = Evento.objects.get(id=curso)
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
        token['nombre']=user.username
        if(user.groups.first().name=="Profesores"):
            token['id']=user.profesor.id
        elif(user.groups.first().name=="Alumnos"):
            token['id']=user.alumno.id
        elif(user.groups.first().name=="Admin"):
            token['id']=user.id
        else:
            token['id']="ERROR:no pertenece a ningun grupo"
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
def crearEvento(request):
    if request.method == 'POST':
        serializer = EventoSerializer(data=request.data)
        print("\n\n\n HASTA AQUI LLEGO \n\n\n",serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    eventos = Evento.objects.all()
    serializer = EventoSerializerGet(eventos, many=True)
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
    serializer = DetalleProfesorSerializer1(profesor)
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

@permission_classes([IsAuthenticated])
def obtener_detalle_alumno(request, pk):
    profesor = get_object_or_404(Alumno, id=pk)
    serializer = DetalleAlumnoSerializer(profesor)
    return JsonResponse(serializer.data)


@permission_classes([IsAuthenticated])
def obtener_detalle_clase(request, pk):
    curso = get_object_or_404(Curso, id=pk)
    serializer = DetalleCursoSerializer(curso)
    return JsonResponse(serializer.data)

@permission_classes([IsAuthenticated])
def obtener_detalle_evento(request, pk):
    evento = get_object_or_404(Evento, id=pk)
    serializer = DetalleEventoSerializer(evento)
    return JsonResponse(serializer.data)

obtener_detalle_evento

# @api_view(['PUT'])
# def profesor_update(request, pk):
#     try:
#         profesor = Profesor.objects.get(pk=pk)
#     except Profesor.DoesNotExist:
#         return Response(status=404)

#     serializer = ProfesorSerializer(profesor, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)

# from rest_framework.generics import UpdateAPIView

# class ProfesoUpdateView(UpdateAPIView):
#     queryset = Profesor.objects.all()
#     serializer_class = ProfesorSerializerCrear


# class ProfesorUpdateView(generics.UpdateAPIView):
#     queryset = Profesor.objects.all()
#     serializer_class = ProfesorSerializerCrear

#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=partial)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)

#         if getattr(instance, '_prefetched_objects_cache', None):
#             # Si el objeto ha sido pre-cargado, necesitamos volver a cargarlo para que los cambios sean reflejados
#             instance = self.get_object()
#             serializer = self.get_serializer(instance)

#         return Response(serializer.data)


# class ProfesorUpdateView(generics.UpdateAPIView):
#     queryset = Profesor.objects.all()
#     serializer_class = ProfesorSerializerCrear

@api_view(['PUT'])
def update_profesor(request, pk):
    try:
        profesor = Profesor.objects.get(pk=pk)
        serializer = ProfesorSerializerModificar(profesor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Profesor.DoesNotExist:
        return Response({'error': 'Profesor not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_clase(request, pk):
    try:
        curso = Curso.objects.get(pk=pk)
        serializer = CursoSerializerModificar(curso, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Profesor.DoesNotExist:
        return Response({'error': 'Curso not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_evento(request, pk):
    try:
        evento = Evento.objects.get(pk=pk)
        serializer = EventoSerializerModificar(evento, data=request.data)
        if serializer.is_valid():
            print("\n\n\n HASTA AQUI LLEGO \n\n\n",serializer)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Evento.DoesNotExist:
        return Response({'error': 'Curso not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_alumno(request, pk):
    try:
        alumno = Alumno.objects.get(pk=pk)
        serializer = AlumnoSerializerModificar(alumno, data=request.data)
        if serializer.is_valid():
            nombre_padre = serializer.validated_data['nombre_padre']
            nombre_madre = serializer.validated_data['nombre_madre']
            descripcion = serializer.validated_data['descripcion']
            telefono_padre = serializer.validated_data['telefono_padre']
            telefono_madre = serializer.validated_data['telefono_madre']
            fecha_nacimiento = serializer.validated_data['fecha_nacimiento']
            # password = serializer.validated_data['password']
            alumno.nombre_padre = nombre_padre
            alumno.nombre_madre = nombre_madre
            alumno.descripcion = descripcion
            alumno.telefono_padre = telefono_padre
            alumno.telefono_madre = telefono_madre
            alumno.fecha_nacimiento = fecha_nacimiento
            # serializer.save()
            alumno.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # return Response(serializer.data, status=status.HTTP_200_OK)
    except Alumno.DoesNotExist:
        return Response({'error': 'Alumno not found'}, status=status.HTTP_404_NOT_FOUND)
    cursos = serializer.validated_data['curso']
    print("\n\n HOLA \n\n",cursos)
    try:
        # i wanna reset the cursos
        alumno.curso.clear()
        for curso in cursos:
            print("\n\n id_curdo\n\n",curso)
            curso = Evento.objects.get(id=curso)
            alumno.curso.add(curso)
        alumno.save()
        print("\n\n HOLA1 \n\n",serializer)
        return Response({'alumno modificado'}, status=status.HTTP_200_OK)
        # return Response(serializer.data, status=status.HTTP_200_OK)
    except Evento.DoesNotExist:
        return Response(
            {'message': 'El curso no existe'},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response(serializer.data, status=status.HTTP_200_OK)


class ProfesorUpdateView(generics.UpdateAPIView):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializerCrear

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        print("HOLA AQUI ")
        
        # Actualizar el objeto Profesor
        self.perform_update(serializer)
        # Actualizar el objeto User
        user_data = {
            'username': request.data.get('usuario.username'),
            'email': request.data.get('usuario.email'),
            'nombre': request.data.get('usuario.nombre'),
            'primer_apellido': request.data.get('usuario.primer_apellido'),
            'segundo_apellido': request.data.get('usuario.segundo_apellido')
        }
        user = instance.usuario
        for key, value in user_data.items():
            setattr(user, key, value)
        user.save()
        
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}
        
        return Response(serializer.data)
    
@permission_classes([IsAuthenticated])
def modificar_academia_usuario(request):
    if request.method == 'POST':
        usuario_id = request.POST.get('usuario')
        academia = request.POST.get('academia')
        
        
        try:
            usuario = User.objects.get(id=usuario_id)
            academia=Academia.objects.get(id=academia)
            usuario.academia = academia
            usuario.save()
            
            return JsonResponse({'message': 'Academia asignada correctamente'})
        
        except User.DoesNotExist:
            return JsonResponse({'error': 'El usuario no existe'})
    
    return JsonResponse({'error': 'Método no permitido'})