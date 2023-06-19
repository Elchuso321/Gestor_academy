from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from .serializers import RegisterSerializer, SetNewPasswordSerializer, ResetPasswordEmailRequestSerializer, EmailVerificationSerializer, LoginSerializer, LogoutSerializer,RegisterSerializer1
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User,Message
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from academia.models import Evento,Curso,Academia
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .renderers import UserRenderer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
import os
from rest_framework.permissions import IsAuthenticated,AllowAny
from datetime import datetime

# from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [os.environ.get('APP_SCHEME'), 'http', 'https']


class RegisterView(generics.GenericAPIView):
    permissions_classes=[AllowAny]
    serializer_class = RegisterSerializer1
    # renderer_classes = (UserRenderer,)

    def post(self, request):
        user = request.data
        user['academia'] = request.data.get('academia')
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token
        # current_site = get_current_site(request).domain

        # HARDCODED
        current_site='http://academygestor.vercel.app'+'/admin/academia/confirmacion/'
        # current_site='http://localhost:5173'+'/admin/academia/confirmacion/'
        # relativeLink = reverse('email-verify')
        # relativeLink
        absurl = current_site+"?token="+str(token)
        email_body = 'Hi '+user.username + ' HOLAAAAA \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}


        print("\n\nUSUAARIO\n\n",user.id)
        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def update_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
        serializer = RegisterSerializer(user, data=request.data)
        print("\n\n HOLA \n\n")
        if serializer.is_valid():
            serializer.save()
            password=request.data.get('password')
            user.set_password(password)
            user.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    

class VerifyEmail(generics.GenericAPIView):
    def get(self,request):
        token=request.GET.get('token')
        # print(request)
        try:
            payload=jwt.decode(token,settings.SECRET_KEY, algorithms=["HS256"])
            
            user=User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified=True
                user.save()
            return Response({'email':'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            payload = jwt.decode(token, options={"verify_signature": False})
            user_id = payload['user_id']
            user1 = User.objects.get(id=user_id)
            user=User.objects.get(email=user1.email)
            token = RefreshToken.for_user(user).access_token
            current_site = get_current_site(request).domain
            relativeLink = reverse('email-verify')
            absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
            email_body = 'Hi '+user.username + \
            ' Use the link below to verify your email \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

            Util.send_email(data)
            print('hola',data)
            # print('hola',user_id)
            #  return RedirectView.as_view(url='./')(request,request(RefreshToken.for_user(user).access_token))
        # //LLAMAR OTRA FUNCION DONDE LO MANDES CON LOS DATOS Y UN TOKEN Y YA
            return Response({'error':'Token expired '}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error':'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


# class VerifyEmail(views.APIView):
#     serializer_class = EmailVerificationSerializer

#     token_param_config = openapi.Parameter(
#         'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

#     @swagger_auto_schema(manual_parameters=[token_param_config])
#     def get(self, request):
#         token = request.GET.get('token')
#         try:
#             payload = jwt.decode(token, settings.SECRET_KEY)
#             user = User.objects.get(id=payload['user_id'])
#             if not user.is_verified:
#                 user.is_verified = True
#                 user.save()
#             return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
#         except jwt.ExpiredSignatureError as identifier:
#             return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
#         except jwt.exceptions.DecodeError as identifier:
#             return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl+"?redirect_url="+redirect_url
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url+'?token_valid=False')
                else:
                    return CustomRedirect(os.environ.get('FRONTEND_URL', '')+'?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(redirect_url+'?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            else:
                return CustomRedirect(os.environ.get('FRONTEND_URL', '')+'?token_valid=False')

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url+'?token_valid=False')
                    
            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)



class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


# import pusher

# pusher_client = pusher.Pusher(
#   app_id='1611988',
#   key='0bd6d501111469b84b7c',
#   secret='40f77d39185bbc452dff',
#   cluster='mt1',
#   ssl=True
# )


from .pusher import pusher_client as pusher

class MessageApiView(views.APIView):
    def post(self, request):
        username = request.data['username']
        message_content = request.data['message']
        clase=request.data['clase']
        timestamp = datetime.now().strftime('%H:%M:%S')
        message = Message(username=username, content=message_content,clase=clase,timestamp=timestamp)
        message.save()
        print("\n\n"+clase+"\n\n")


        pusher.trigger(clase, 'message', {
            'username': username,
            'message': message_content
        })
        if message_content.startswith("#all#"):
            print("El contenido comienza con '#all#'")
            claseObjeto=Curso.objects.get(nombre=clase)
            usuarios_filtrados = User.objects.filter(alumno__curso__curso__id=claseObjeto.id)
            print(usuarios_filtrados)
            for usuario in usuarios_filtrados:
                print(usuario.email)
                redirect_url = request.data.get('redirect_url', '')
                email_body = 'Hello, '+ username +'\nHas recibido un mensaje de la clase:  '+clase +'\n\nMensaje:\n     '+message_content
                data = {'email_body': email_body, 'to_email': usuario.email,
                        'email_subject': 'Mensaje recibido de la clase: '+clase}
                Util.send_email(data)

        return Response(status=status.HTTP_200_OK)
    
class EmailApiView(views.APIView):
    def post(self, request):
        username = request.data['username']
        message_content = request.data['message']
        subject=request.data['subject']
        # saco al usuario que tiene esa id 
        usuario = User.objects.get(id=username)
        print(usuario.email)
        
        data = {'email_body': message_content, 'to_email': usuario.email,
                'email_subject': subject}
        Util.send_email(data)

        return Response(status=status.HTTP_200_OK)
    

    # def post(self,request):
        
    #     pusher.trigger('chat', 'message', {
    #         'username': request.data['username'],
    #         'message': request.data['message']
    #         })
    #     return Response(request.data,status=status.HTTP_200_OK)


# def crear_canal(request):
#     nombre_canal = request.POST.get('nombre_canal')

#     canal_creado = pusher.create_channel(nombre_canal)

#     return JsonResponse({'status': 'OK', 'canal_creado': canal_creado})


from .models import Message
from .serializers import MessageSerializer

class AllMessagesApiView(views.APIView):
    def get(self, request):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)


# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .serializers import CustomUserSerializer
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.permissions import AllowAny


# class CustomUserCreate(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, format='json'):
#         serializer = CustomUserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             if user:
#                 json = serializer.data
#                 return Response(json, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class BlacklistTokenUpdateView(APIView):
#     permission_classes = [AllowAny]
#     # authentication_classes = ()

#     def post(self, request):
#         try:
#             refresh_token = request.data["refresh_token"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)