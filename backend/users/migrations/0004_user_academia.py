# Generated by Django 4.0.8 on 2023-06-09 11:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('academia', '0009_remove_alumno_academia_remove_profesor_academia'),
        ('users', '0003_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='academia',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='profesores', to='academia.academia'),
        ),
    ]
