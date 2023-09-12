from django.urls import path
from base.views import users_views

urlpatterns = [
    path('login/', users_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', users_views.registerUser, name='register'),
    path('profile/', users_views.getUserProfile, name="users-profile"),
    path('profile/update/', users_views.updateUserProfile, name="user-profile-update"),
    path('', users_views.getUsers, name="users"),
    path('<str:pk>/', users_views.getUserById, name='user'),
    path('update/<str:pk>/', users_views.updateUser, name='user-update'),
    path('delete/<str:pk>/', users_views.deleteUser, name='user-delete'),
    ]
