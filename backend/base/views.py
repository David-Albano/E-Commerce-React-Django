from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .products import products

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
    return Response(products)

@api_view(['GET'])
def getSingleProduct(request, pk):
    # product_selected = filter(lambda product: (product['_id'] == pk), products)

    product_selected = None
    for product in products:
        if product['_id'] == pk:
            product_selected = product
            break

    return Response(product_selected)
