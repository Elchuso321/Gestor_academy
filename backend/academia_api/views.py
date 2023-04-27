from rest_framework import generics
from academia.models import Alumno
from .serialiazers import AlumnoSerializer
#####PERMISOS
from rest_framework.permissions import IsAdminUser,IsAuthenticated,AllowAny,DjangoModelPermissionsOrAnonReadOnly,BasePermission,SAFE_METHODS
# DjangoModelPermissionsOrAnonReadOnly=es para los permisos que tiene ese usuario en nuestra base de datos
class AlumnoUserWritePermisions(BasePermission):
    message='Editing alumnos is restricted to the admin only'
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user



##########FIN DE PERMISOS ####
# Esta es para un elemento en particular y crear
class AlumnoList(generics.ListCreateAPIView):
    # permission_classes=[AllowAny]
    queryset=Alumno.objects.all()
    # tambien se puede elegir solo un elemento de ese elemtnot
    serializer_class=AlumnoSerializer
    pass
# Este es oara la lista entera o para borrar

# si pongo RetrieveAPIViews en lugar de RetrieveDestroyAPIViews no lo puede destruir solo ver
# despues de lo que pongas despues de generics. es lo que tiene permitido hacer esta funcion:  Retrieve es ver ,Update es modificar y Destroy es borrar
class AlumnoDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=[AlumnoUserWritePermisions]
    queryset=Alumno.objects.all()
    # tambien se puede elegir solo un elemento de ese elemtnot
    serializer_class=AlumnoSerializer
    pass


