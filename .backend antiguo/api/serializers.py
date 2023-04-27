from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name')
        user.last_name = self.validated_data.get('last_name')
        user.save()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Token
        fields = ('key', 'user')


# from rest_framework import serializers
# from api.models import Profesor

# class ProfesorSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model=Profesor
#         fields=['nombre','apellidos','email']

# class ProfesorSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model=Profesor
#         fields=['nombre','apellidos','email']