from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse

class DietasAPITests(TestCase):
    def setUp(self):
        # Inicializar el cliente API para las pruebas
        self.client = APIClient()
        # URL para el endpoint de dietas
        self.dietas_url = reverse('dietas-list')  # Asegúrate de que este nombre coincida con el definido en urls.py

    def test_dietas_unauthorized_access(self):
        """
        Prueba que verifica que un usuario no autenticado no puede
        acceder al endpoint de dietas
        """
        # Intenta obtener la lista de dietas sin autenticación
        response = self.client.get(self.dietas_url)
        
        # Verifica que la respuesta sea 401 Unauthorized
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Verifica que la respuesta contenga el mensaje de error esperado
        response_data = response.json()
        self.assertEqual(
            response_data['detail'],
            'Authentication credentials were not provided.'
        )
