from django.contrib import admin
from users.models import NewUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


# class UserAdminConfig(UserAdmin):
#     model = NewUser
#     search_fields = ('email', 'user_name', 'first_name',)
#     list_filter = ('email', 'user_name', 'first_name', 'is_active', 'is_staff')
#     ordering = ('-start_date',)
#     list_display = ('email', 'id','user_name', 'first_name',
#                     'is_active', 'is_staff','groups_list')
#     fieldsets = (
#         (None, {'fields': ('email', 'user_name', 'first_name',)}),
#         ('Permissions', {'fields': ('is_staff', 'is_active')}),
#         ('Personal', {'fields': ('about',)}),
#     )
#     formfield_overrides = {
#         models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
#     }
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
#          ),
#     )


# admin.site.register(NewUser, UserAdminConfig)


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email', 'user_name', 'first_name',)
    list_filter = ('email', 'user_name', 'first_name', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'id', 'user_name', 'first_name', 'is_active', 'is_staff', 'groups_list')
    fieldsets = (
        (None, {'fields': ('email', 'user_name', 'first_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('about',)}),
        ('Groups', {'fields': ('groups',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )

    def groups_list(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])
    groups_list.short_description = 'Groups'

admin.site.register(NewUser, UserAdminConfig)