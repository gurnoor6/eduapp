from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from django.http import HttpResponse

# Create your views here.


class MCQQuestions(viewsets.ModelViewSet):
	queryset = QuestionMCQ.objects.all()
	serializer_class = QuestionMCQSerializer

	def post(self,request,*args,**kwargs):
		statement = request.data['statement']
		option1 = request.data['option1']
		option2 = request.data['option2']
		option3 = request.data['option3']
		option4 = request.data['option4']
		answer = request.data['answer']
		QuestionMCQ.objects.create(statement=statement,option1=option1,option2=option2,
								   option3=option3,option4=option4,answer=answer)
		return HttpResponse({'message':'Registered Successfully'},status=200)


class IntegerQuestion(viewsets.ModelViewSet):
	queryset = IntegerQuestion.objects.all()
	serializer_class = IntegerQuestionSerializer

	def post(self,request,*args,**kwargs):
		statement = request.data['statement']
		answer = request.data['answer']
		IntegerQuestion.objects.create(statement=statement,answer=answer)

class User(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	def post(self,request,*args,**kwargs):
		try:
			name = request.data['name']
			email = request.data['email']
			password = request.data['password']
			IntegerQuestion.objects.create(name=name,email=email,password=password)
		except:
			return JsonResponse({"response":"fail"})