from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'caption', 'image', 'video', 'created_at']
        read_only_fields = ['user', 'created_at']
