from django.db import models
from django.conf import settings

class Insumo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    unidad_medida = models.CharField(max_length=50)
    stock_actual = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre

class MovimientoAlmacen(models.Model):
    insumo = models.ForeignKey(Insumo, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)
    usuario_responsable = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        abstract = True

class Entrada(MovimientoAlmacen):
    proveedor = models.ForeignKey('adquisiciones.Proveedor', on_delete=models.CASCADE)

class Salida(MovimientoAlmacen):
    area_solicitante = models.CharField(max_length=100)

class Devolucion(MovimientoAlmacen):
    motivo = models.CharField(max_length=255)
