from rest_framework import serializers
from .models import Insumo, Entrada, Salida, Devolucion

class InsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insumo
        fields = '__all__'

class EntradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrada
        fields = '__all__'

class SalidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salida
        fields = '__all__'

class DevolucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devolucion
        fields = '__all__'
