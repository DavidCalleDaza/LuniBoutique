from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),

    # URL para el formulario de creación
    path('crear/', views.create_product_view, name='create_product'),

    # NUEVAS URLs PARA GESTIONAR PRODUCTOS
    path('lista/', views.product_list_view, name='product_list'),
    path('editar/<str:pk>/', views.update_product_view, name='update_product'),
    path('eliminar/<str:pk>/', views.delete_product_view, name='delete_product'),
]