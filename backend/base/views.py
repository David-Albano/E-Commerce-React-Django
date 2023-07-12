from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serialiazers import ProductsSerializer

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

from .products import products
@api_view(['GET'])
def getProducts(request):

    # for i in products:
    #     Product.objects.create(
    #             _id = i['_id'],
    #             name = i['name'],
    #             description = i['description'],
    #             brand = i['brand'],
    #             category = i['category'],
    #             price = i['price'],
    #             countInStock= i['countInStock'],
    #             rating = i['rating'],
    #             numReviews = i['numReviews'],
    #     )
    # print('CREATED')
    # return Response('Created')
    products = Product.objects.all()
    products_serialized = ProductsSerializer(products, many=True)

    return Response(products_serialized.data)



@api_view(['GET'])
def getSingleProduct(request, pk):
    product_selected = ProductsSerializer(Product.objects.get(_id=pk))

    return Response(product_selected.data)
