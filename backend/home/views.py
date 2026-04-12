from django.shortcuts import render
from .serializers import ListSerializer, TaskSerializer
from .models import List, Task
from rest_framework import viewsets, permissions

class ListViewSet(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return List.objects.filter(owner=self.request.user).prefetch_related('tasks')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(list__owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save()