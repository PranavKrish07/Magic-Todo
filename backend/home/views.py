from django.shortcuts import render
from .serializers import ListSerializer
from .models import List
from rest_framework import viewsets, permissions

class ListViewSet(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return List.objects.filter(user=self.request.user).prefetch_related('tasks')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)