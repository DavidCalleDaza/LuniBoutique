from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm

from .forms import ProductForm
from .models import Categoria, Producto

def index_view(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.filter(disponible=True)
    
    context = {
        'categorias': categorias,
        'productos': productos,
    }
    return render(request, 'products/index.html', context)

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                # --- CAMBIO 1: Redirigir a la lista de productos ---
                return redirect('product_list') 
    else:
        form = AuthenticationForm()
    return render(request, 'products/login.html', {'form': form})

@login_required(login_url='login')
def create_product_view(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # --- CAMBIO 2: Redirigir a la lista de productos ---
            return redirect('product_list') 
    else:
        form = ProductForm()
    return render(request, 'products/create_product.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def product_list_view(request):
    productos = Producto.objects.all().order_by('-creado')
    return render(request, 'products/product_list.html', {'productos': productos})

@login_required(login_url='login')
def update_product_view(request, pk):
    producto = Producto.objects.get(id=pk)
    form = ProductForm(instance=producto)

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=producto)
        if form.is_valid():
            form.save()
            return redirect('product_list')

    return render(request, 'products/update_product.html', {'form': form})

@login_required(login_url='login')
def delete_product_view(request, pk):
    producto = Producto.objects.get(id=pk)
    if request.method == 'POST':
        producto.delete()
        return redirect('product_list')
    
    return render(request, 'products/delete_confirm.html', {'producto': producto})