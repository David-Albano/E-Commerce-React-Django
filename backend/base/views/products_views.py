from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Product

from base.serializers import ProductsSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    products_serialized = ProductsSerializer(products, many=True)

    return Response(products_serialized.data)


@api_view(['GET'])
def getSingleProduct(request, pk):
    product_selected = ProductsSerializer(Product.objects.get(_id=pk))

    return Response(product_selected.data)