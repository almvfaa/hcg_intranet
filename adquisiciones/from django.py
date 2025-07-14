from django.db import models

class Proveedor(models.Model):
    razon_social = models.CharField(max_length=255)
    rfc = models.CharField(max_length=13)
    direccion = models.TextField()
    contacto_nombre = models.CharField(max_length=100)
    contacto_email = models.EmailField()

    def __str__(self):
        return self.razon_social

class ProgramacionAnual(models.Model):
    anio = models.PositiveIntegerField()
    presupuesto_total = models.DecimalField(max_digits=15, decimal_places=2)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return f"{self.anio} - {self.presupuesto_total}"

class ProcesoCompra(models.Model):
    ESTADOS = [
        ('En planeación', 'En planeación'),
        ('Activo', 'Activo'),
        ('Adjudicado', 'Adjudicado'),
        ('Finalizado', 'Finalizado'),
    ]
    programacion = models.ForeignKey(ProgramacionAnual, on_delete=models.CASCADE)
    objeto_contratacion = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default='En planeación')

    class Meta:
        abstract = True

class Licitacion(ProcesoCompra):
    numero_licitacion = models.CharField(max_length=50)
    fecha_junta_aclaraciones = models.DateField()
    fecha_presentacion_ofertas = models.DateField()

    def __str__(self):
        return f"Licitación {self.numero_licitacion} - {self.objeto_contratacion}"

class AdjudicacionDirecta(ProcesoCompra):
    motivo_adjudicacion = models.TextField()
    cotizacion_referencia = models.CharField(max_length=255)

    def __str__(self):
        return f"Adjudicación Directa - {self.objeto_contratacion}"

class Contrato(models.Model):
    proceso_compra = models.ForeignKey(ProcesoCompra, on_delete=models.CASCADE)
    proveedor_adjudicado = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    monto_total = models.DecimalField(max_digits=15, decimal_places=2)
    fecha_firma = models.DateField()
    archivo_contrato = models.FileField(upload_to='contratos/')

    def __str__(self):
        return f"Contrato {self.id} - {self.proveedor_adjudicado.razon_social}"
