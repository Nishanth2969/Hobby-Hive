from django.urls import path
from .views import create_post, list_posts

urlpatterns = [
    path('create/', create_post, name='create_post'),
    path('', list_posts, name='list_posts'),
]
