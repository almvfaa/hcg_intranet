from rest_framework import permissions

class EsNutriologo(permissions.BasePermission):
    """Permite el acceso solo a usuarios con rol 'Nutriólogo'."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and getattr(request.user, 'rol', None) == 'Nutriólogo')
