from django.urls import include, path,re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('mcqquestions',views.MCQQuestions)
router.register('integerquestions',views.IntegerQuestion)
router.register('users',views.UserClass)

urlpatterns = [
    path('', include(router.urls)),
    path('login/',views.LoginView),
    path('checkuser/',views.CheckUser)
]
