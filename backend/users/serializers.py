from rest_framework import serializers
from .models import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from academia_api.serialiazers import ProfesorSerializer
from rest_framework.serializers import ModelSerializer
from .models import User
from academia.models import Profesor
    
# class UserSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'nombre', 'primer_apellido', 'segundo_apellido', 'is_verified', 'is_active', 'is_staff', 'created_at', 'updated_at', 'auth_provider']

# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(
#         max_length=68, min_length=6, write_only=True)
    
#     default_error_messages = {
#         'username': 'The username should only contain alphanumeric characters'}

#     profesor = ProfesorSerializer(required=False)

#     class Meta:
#         model = User
#         fields = ['email', 'username', 'password', 'nombre', 'primer_apellido', 'segundo_apellido']

#     def validate(self, attrs):
#         email = attrs.get('email', '')
#         username = attrs.get('username', '')
        
#         if not username.isalnum():
#             raise serializers.ValidationError(
#                 self.default_error_messages)
#         return attrs

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         profesor_data = validated_data.pop('profesor', None)

#         user = User.objects.create(**validated_data)
#         if password is not None:
#             user.set_password(password)
#             user.save()

#         if profesor_data is not None:
#             Profesor.objects.create(usuario=user, **profesor_data)

#         return user
    
    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     profesor_data = validated_data.pop('profesor', None)

    #     user = User.objects.create(**validated_data)
    #     print("\n\n\n\n\n\n\n\n\n\n AQUI \n\n\n\n")
    #     profe=Profesor.objects.create(usuario=user)
    #     profe.save()
    #     if password is not None:
    #         user.set_password(password)
    #         user.save()
    #         # 
            

    #     # if profesor_data is not None:

    #     return user
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    default_error_messages = {
        'username': 'The username should only contain alphanumeric characters'}

    class Meta:
        model = User
        fields = ['email', 'username', 'password']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        
        if not username.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class RegisterSerializer1(serializers.ModelSerializer):
    # password = serializers.CharField(
    #     max_length=68, min_length=6, write_only=True)
    
    default_error_messages = {
        'username': 'The username should only contain alphanumeric characters'}

    class Meta:
        model = User
        fields = ['email', 'username' , 'password', 'nombre', 'primer_apellido', 'segundo_apellido','groups','academia']
        # 
        # fields = ['email', 'username', 'password']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        
        if not username.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        return attrs

    def create(self, validated_data):
        groups_data = validated_data.pop('groups')
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        # Asigna los grupos al usuario utilizando el método set()
        user.groups.set(groups_data)

        return user
        # return User.objects.create_user(**validated_data)
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.primer_apellido = validated_data.get('primer_apellido', instance.primer_apellido)
        instance.segundo_apellido = validated_data.get('segundo_apellido', instance.segundo_apellido)
        instance.academia = validated_data.get('academia', instance.academia)
        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        groups_data = validated_data.get('groups')
        if groups_data:
            instance.groups.set(groups_data)

        instance.save()
        return instance


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    username = serializers.CharField(
        max_length=255, min_length=3, read_only=True)

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = User.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = User
        fields = ['email', 'password', 'username', 'tokens']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        filtered_user_by_email = User.objects.filter(email=email)
        user = auth.authenticate(email=email, password=password)

        if filtered_user_by_email.exists() and filtered_user_by_email[0].auth_provider != 'email':
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')

        return {
            'email': user.email,
            'username': user.username,
            'tokens': user.tokens
        }

        return super().validate(attrs)


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')


# from rest_framework import serializers
# from users.models import User
# from django.contrib.auth.models import Group

# class CustomUserSerializer(serializers.ModelSerializer):
#     """
#     Currently unused in preference of the below.
#     """
#     email = serializers.EmailField(required=True)
#     user_name = serializers.CharField(required=True)
#     password = serializers.CharField(min_length=8, write_only=True)

#     class Meta:
#         model = User
#         fields = ('email', 'user_name', 'password','nombre','primer_apellido','groups')
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         groups_data = validated_data.pop('groups', [])
#         # Create user
#         print("\n\n\n\n\n\n\n\n\n\n\n\n",groups_data,"\n\n\n\n\n\n\n\n\n\n\n\n")
#         user = self.Meta.model(**validated_data)
#         if password is not None:
#             user.set_password(password)
#         user.save()
#         # Add user to groups
#         # group = Group.objects.get(name='groups')
#         # user.groups.add(group)

#         for group_name in groups_data:
#             # group = Group.objects.get(name=group_name)
#             user.groups.add(group_name)
#         return user
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'