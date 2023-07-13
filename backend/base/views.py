from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product

from django.contrib.auth.models import User
from .serialiazers import ProductsSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        "edit-task-client/<int:task_client_id>",
        "field",
        "edit-field/<int:count_variable_id>",
        "edit-option-extra-info/<int:option_id>",
        "task-type",
        "upload-holidays-excel"
    ]

    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    products_serialized = ProductsSerializer(products, many=True)

    return Response(products_serialized.data)



@api_view(['GET'])
def getSingleProduct(request, pk):
    product_selected = ProductsSerializer(Product.objects.get(_id=pk))

    return Response(product_selected.data)
