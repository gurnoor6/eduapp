from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

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

class UserClass(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	def post(self,request,*args,**kwargs):
		name = request.data['name']
		email = request.data['email']
		password = request.data['password']
		profilepicture = request.data['profilepicture']
		IntegerQuestion.objects.create(name=name,email=email,password=password,profilepicture=profilepicture)



# Log in the user by checking his credentials
@csrf_exempt
def LoginView(request):
	if request.method=='POST':
		profiles = User.objects.all()
		email = request.POST['email']
		password = request.POST['password']
		print(email,password)
		if email is not None and password is not None:
			profiles = profiles.filter(email=email,password=password)
		
		profile_serializer = UserSerializer(profiles,many=True)
		print(profile_serializer)
		if(len(profiles)==1):
			return JsonResponse(profile_serializer.data,safe=False)
		else:
			return JsonResponse({"response":"fail"})


# check if a user of same email exists
@csrf_exempt
def CheckUser(request):
	print(request)
	email = request.POST['email']
	users = User.objects.all().filter(email = email)
	if(len(users)!=0):
		return JsonResponse({"response":"fail"})
	else:
		return JsonResponse({"response":"pass"})

