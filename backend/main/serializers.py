from .models import *
from rest_framework import serializers


class QuestionMCQSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionMCQ
        fields = ['statement', 'option1', 'option2', 'option3','option4','answer']


class IntegerQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntegerQuestion
        fields = ['statement','answer']