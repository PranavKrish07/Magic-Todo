from django.shortcuts import render
from .serializers import ListSerializer, TaskSerializer
from .models import List, Task
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from google import genai
import json

class ListViewSet(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return List.objects.filter(owner=self.request.user).prefetch_related('tasks')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def generate_tasks(self, request, pk=None):
        my_list = self.get_object()
        user_api_key = request.user.gemini_api_key
        
        if not user_api_key:
            return Response(
                {"error": "No Gemini API key found. Please update your profile settings."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            client = genai.Client(api_key=user_api_key)
            import time
            max_retries = 3
            last_error = None
            
            for attempt in range(max_retries):
                try:
                    response = client.models.generate_content(
                        model='gemini-flash-lite-latest',
                        contents=f"Generate 5-7 actionable, short task names for a to-do list named '{my_list.name}'. Return ONLY a JSON array of strings, with no markdown code blocks or extra text. Example: [\"Task 1\", \"Task 2\"]",
                    )
                    break
                except Exception as api_e:
                    last_error = str(api_e)
                    if '503' in last_error or '429' in last_error:
                        time.sleep(2 * (attempt + 1))
                    else:
                        raise api_e
            else:
                raise Exception(f"Google APIs overloaded. Last error: {last_error}")
            
            output_text = response.text.strip()
            if output_text.startswith("```json"):
                output_text = output_text[7:]
            if output_text.startswith("```"):
                output_text = output_text[3:]
            if output_text.endswith("```"):
                output_text = output_text[:-3]
            output_text = output_text.strip()
            
            task_names = json.loads(output_text)
            
            new_tasks = []
            for name in task_names:
                task = Task.objects.create(list=my_list, name=name)
                new_tasks.append(task)
                
            serializer = TaskSerializer(new_tasks, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(list__owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save()