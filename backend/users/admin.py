from django.contrib import admin

# Register your models here.
from users.models import User,Message


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email','nombre','primer_apellido','segundo_apellido', 'auth_provider', 'created_at']


admin.site.register(User, UserAdmin)
admin.site.register(Message)









# from django.contrib import admin
# from users.models import NewUser
# from django.contrib.auth.admin import UserAdmin
# from django.forms import TextInput, Textarea, CharField
# from django import forms
# from django.db import models


# class UserAdminConfig(UserAdmin):
#     model = NewUser
#     search_fields = ('email', 'user_name', 'nombre',)
#     list_filter = ('email', 'user_name', 'nombre', 'is_active', 'is_staff')
#     ordering = ('-fecha_registro',)
#     list_display = ('email', 'id', 'user_name', 'nombre','primer_apellido','segundo_apellido', 'is_active', 'is_staff', 'groups_list')
#     fieldsets = (
#         (None, {'fields': ('email', 'user_name', 'nombre','primer_apellido','segundo_apellido')}),
#         ('Permissions', {'fields': ('is_staff', 'is_active')}),
#         ('Groups', {'fields': ('groups',)}),
#     )
#     formfield_overrides = {
#         models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
#     }
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'user_name', 'nombre', 'password1', 'password2', 'is_active', 'is_staff')}
#          ),
#     )

#     def groups_list(self, obj):
#         return ", ".join([group.name for group in obj.groups.all()])
#     groups_list.short_description = 'Groups'

# admin.site.register(NewUser, UserAdminConfig)


