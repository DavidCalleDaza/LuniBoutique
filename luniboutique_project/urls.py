from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# IMPORTANTE: Importa la vista del index desde tu app de productos
from products.views import index_view 

urlpatterns = [
    # IMPORTANTE: Añade esta línea para la página de inicio
    path('', index_view, name='index'), 

    path('admin/', admin.site.urls),
    path('admin-personal/', include('products.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)