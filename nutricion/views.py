

from rest_framework import viewsets
from .models import Dieta, Patologia, PlaneacionMenu
from .serializers import DietaSerializer, PatologiaSerializer, PlaneacionMenuSerializer
from usuarios.permissions import EsNutriologo

class DietaViewSet(viewsets.ModelViewSet):
    queryset = Dieta.objects.all()
    serializer_class = DietaSerializer

class PatologiaViewSet(viewsets.ModelViewSet):
    queryset = Patologia.objects.all()
    serializer_class = PatologiaSerializer

class PlaneacionMenuViewSet(viewsets.ModelViewSet):
    queryset = PlaneacionMenu.objects.all()
    serializer_class = PlaneacionMenuSerializer
    permission_classes = [EsNutriologo]
