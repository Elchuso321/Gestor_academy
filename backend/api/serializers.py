
from rest_framework import serializers
from api.models import Profesor

class ProfesorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Profesor
        fields=['nombre','apellidos','email']

class ProfesorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Profesor
        fields=['nombre','apellidos','email']