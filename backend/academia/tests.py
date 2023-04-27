from django.test import TestCase

from django.contrib.auth.models import User

from academia.models import Alumno,Asignatura


class Test_Create_Alumno(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_category=Asignatura.objects.create(name="Mates")
        test_user1=User.objects.create(
            username='testname1',password="12346789"
        )
        test_alumno=Alumno.objects.create(
            usuario=test_user1,nombre="Alumno nombre",apellidos="Alumno apellido",email="email@gmail.com",asignaturas=test_category
        )
        def test_academia_content(self):
            alumno=Alumno.postobjects.get(id=1)
            asignatura=Asignatura.postobjects.get(id=1)
            usuario=f'{alumno.usuario}'
            nombre=f'{alumno.nombre}'
            apellidos=f'{alumno.apellidos}'
            email=f'{alumno.email}'
            asignaturas=f'{alumno.asignaturas}'
            # self.assertEqual(,'')
            self.assertEqual(nombre,'Alumno nombre')
            self.assertEqual(apellidos,'Alumno apellido')
            self.assertEqual(email,'email@gmail.com')
            self.assertEqual(str(alumno),'Alumno nombre Alumno apellido')
            self.assertEqual(str(asignatura),'Mates')


