# Generated by Django 4.0.8 on 2023-05-12 19:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('academia', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='profesor',
            name='usuario',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='evento',
            name='aula',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='eventos', to='academia.aula'),
        ),
        migrations.AddField(
            model_name='evento',
            name='curso',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='eventos', to='academia.curso'),
        ),
        migrations.AddField(
            model_name='evento',
            name='profesor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='eventos', to='academia.profesor'),
        ),
        migrations.AddField(
            model_name='curso',
            name='academia',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cursos', to='academia.academia'),
        ),
        migrations.AddField(
            model_name='boletin',
            name='alumno',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='boletines', to='academia.alumno'),
        ),
        migrations.AddField(
            model_name='boletin',
            name='curso',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='boletines', to='academia.curso'),
        ),
        migrations.AddField(
            model_name='aula',
            name='academia',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='aula', to='academia.academia'),
        ),
        migrations.AddField(
            model_name='alumno',
            name='curso',
            field=models.ManyToManyField(related_name='eventos', to='academia.evento'),
        ),
        migrations.AddField(
            model_name='alumno',
            name='usuario',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='evento',
            unique_together={('dia_semana', 'hora_inicio', 'aula')},
        ),
        migrations.AlterUniqueTogether(
            name='boletin',
            unique_together={('curso', 'trimestre', 'alumno')},
        ),
        migrations.AlterUniqueTogether(
            name='aula',
            unique_together={('nombre', 'academia')},
        ),
    ]
