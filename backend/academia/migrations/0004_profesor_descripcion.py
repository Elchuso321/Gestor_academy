# Generated by Django 4.0.8 on 2023-05-19 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academia', '0003_curso_imagen'),
    ]

    operations = [
        migrations.AddField(
            model_name='profesor',
            name='descripcion',
            field=models.TextField(null=True),
        ),
    ]