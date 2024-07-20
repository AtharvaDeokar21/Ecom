from django.contrib import admin
from .models import Product, Order
# Register your models here.

admin.site.site_header ="E-commerce site"
admin.site.site_title = "Shopping"
admin.site.index_title = "Manage Shopping"

class ProductAdmin(admin.ModelAdmin):
    def change_category_to_default(self,request,queryset):
        queryset.update(category="default")
        
    list_display=('title', 'price', 'discount_price', 'category', 'description')
    search_fields = ('category',)
    actions = ('change_category_to_default',)
    
    
admin.site.register(Product, ProductAdmin)
admin.site.register(Order)