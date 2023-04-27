
from rest_framework import serializers
from academia.models import Alumno


class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Alumno
        fields=("usuario","nombre","apellidos","email","asignaturas")


        