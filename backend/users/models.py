from django.db import models

# Create your models here.
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model


    # nombre,primer_apellido,segundo_apellido
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None,nombre=None,primer_apellido=None,segundo_apellido=None ):
        # ,groups=None
        # print("\n\n\n" ,groups," \n\n\n")
        # group = Group.objects.get(id=groups[0])
        if username is None:
            raise TypeError('Users should have a username')
        if email is None:
            raise TypeError('Email should have a email')
        if nombre is None:
            raise TypeError('nombre should have a nombre')
        if primer_apellido is None:
            raise TypeError('primer_apellido should have a primer_apellido')
        if segundo_apellido is None:
            raise TypeError('segundo_apellido should have a segundo_apellido')
        user = self.model(username=username, email=self.normalize_email(email),nombre=nombre,primer_apellido=primer_apellido,segundo_apellido=segundo_apellido)
        # ,groups=groups
        # user.groups.add(groups)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(username, email, password,nombre="super",primer_apellido="apellido_super",segundo_apellido="apellido2_super")
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


AUTH_PROVIDERS = {'facebook': 'facebook', 'google': 'google',
                  'twitter': 'twitter', 'email': 'email'}


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, db_index=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    nombre = models.CharField(max_length=50)
    primer_apellido = models.CharField(max_length=50)
    segundo_apellido = models.CharField(max_length=50,null=True,blank=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(
        max_length=255, blank=False,
        null=False, default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
