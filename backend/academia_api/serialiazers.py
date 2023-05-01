from rest_framework.serializers import ModelSerializer
from academia.models import Academia


class AcademiaSerializer(ModelSerializer):
    class Meta:
        model = Academia
        fields = '__all__'