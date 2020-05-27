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