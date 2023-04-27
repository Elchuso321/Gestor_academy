from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from academia.models import Alumno,Asignatura
from django.contrib.auth.models import User


# Create your tests here.


class AlumnoTest(APITestCase):
    def test_view_alumno(self):
        # abajo es la parte que es diferente para cada parte
        url=reverse('blog_api:listcreate')
        response=self.client.getI(url,format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)