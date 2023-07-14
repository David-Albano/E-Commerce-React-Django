from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name="users-profile"),
    path('users/', views.getUsers, name="users"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getSingleProduct, name="product"),
    ]
