# Generated by Django 4.0.8 on 2023-06-09 11:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('academia', '0008_alter_alumno_foto_perfil_alter_profesor_foto_perfil'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alumno',
            name='academia',
        ),
        migrations.RemoveField(
            model_name='profesor',
            name='academia',
        ),
    ]