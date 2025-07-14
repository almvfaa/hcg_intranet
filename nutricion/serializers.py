from rest_framework import serializers
from .models import Dieta, Patologia, PlaneacionMenu

class DietaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dieta
        fields = '__all__'

class PatologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patologia
        fields = '__all__'

class PlaneacionMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaneacionMenu
        fields = '__all__'
        depth = 1
