from django.urls import include, path,re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('mcqquestions',views.MCQQuestions)

urlpatterns = [
    path('', include(router.urls)),
]
