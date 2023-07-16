from django.urls import path
from base.views import users_views

urlpatterns = [
    path('login/', users_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', users_views.registerUser, name='register'),
    path('profile/', users_views.getUserProfile, name="users-profile"),
    path('profile/update/', users_views.updateUserProfile, name="user-profile-update"),
    path('', users_views.getUsers, name="users"),
    ]
