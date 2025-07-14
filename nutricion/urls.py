from rest_framework.routers import DefaultRouter
from .views import DietaViewSet, PatologiaViewSet, PlaneacionMenuViewSet

router = DefaultRouter()
router.register(r'dietas', DietaViewSet)
router.register(r'patologias', PatologiaViewSet)
router.register(r'planeaciones', PlaneacionMenuViewSet)

urlpatterns = router.urls
