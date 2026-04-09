from django.db import models
from django.conf import settings

class List(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None, null=True)

    def __str__(self):
        return self.name
    
class Task(models.Model):
    list = models.ForeignKey(List, related_name='tasks', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name