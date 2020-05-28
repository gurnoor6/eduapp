from django.db import models

# Create your models here.
class QuestionMCQ(models.Model):
	statement = models.TextField()
	option1 = models.TextField()
	option2 = models.TextField()
	option3 = models.TextField()
	option4 = models.TextField()
	answer = models.TextField()

	def __str__(self):
		return self.statement

class IntegerQuestion(models.Model):
	statement = models.TextField()
	answer = models.TextField()

	def __str__(self):
		return self.statement


class User(models.Model):
	name = models.CharField(max_length=50)
	password = models.CharField(max_length=100)
	email = models.CharField(max_length=50,unique = True)
	profilepicture = models.ImageField(upload_to='images/',default="")

	def __str__(self):
		return self.name