from django import forms
from .models import Producto

class ProductForm(forms.ModelForm):
    class Meta:
        model = Producto
        # Define qué campos de tu modelo quieres en el formulario
        fields = ['nombre', 'descripcion', 'precio', 'categoria', 'imagen', 'disponible']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'descripcion': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'precio': forms.NumberInput(attrs={'class': 'form-control'}),
            'categoria': forms.Select(attrs={'class': 'form-control'}),
            'imagen': forms.FileInput(attrs={'class': 'form-control'}),
            'disponible': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }