from django.db import models
from usuarios.models import Usuario

class Dieta(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Patologia(models.Model):
    nombre = models.CharField(max_length=100)
    dieta = models.ForeignKey(Dieta, on_delete=models.CASCADE, related_name='patologias')

    def __str__(self):
        return self.nombre

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class PlaneacionMenu(models.Model):
    nutriologa = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='planeaciones')
    dieta = models.ForeignKey(Dieta, on_delete=models.CASCADE, related_name='planeaciones')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='planeaciones')
    fecha = models.DateField()
    tiempos_comida = models.CharField(max_length=50)
    platillo_fuerte = models.CharField(max_length=100)
    postre = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.fecha} - {self.tiempos_comida} ({self.nutriologa})"
