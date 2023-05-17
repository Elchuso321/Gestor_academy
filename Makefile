include .env
up:
	docker compose up
start:
	docker compose up -d
init:
	docker compose up --build -d
	docker compose down
	docker compose up -d
	docker exec -it ${APP_NAME}-server python manage.py makemigrations
	docker exec -it ${APP_NAME}-server python manage.py migrate users
	docker exec -it ${APP_NAME}-server python manage.py migrate
	docker exec -it ${APP_NAME}-server python manage.py createsuperuser
	docker compose down
	docker compose up
migrate:
	docker exec -it ${APP_NAME}-server python manage.py makemigrations
	docker exec -it ${APP_NAME}-server python manage.py migrate users
	docker exec -it ${APP_NAME}-server python manage.py migrate
bash-client:
	docker exec -it ${APP_NAME}-client /bin/bash
bash-server:
	docker exec -it ${APP_NAME}-server /bin/bash
bash-database:
	docker exec -it ${APP_NAME}-db /bin/bash
bash-php:
	docker exec -it ${APP_NAME}-phpmyadmin /bin/bash
superuser:
	docker exec -it ${APP_NAME}-server python manage.py createsuperuser
bd:
	docker exec -it ${APP_NAME}-server python manage.py shell -c "from datetime import time;from academia.models import Academia;from academia.models import Aula;from academia.models import Curso;from academia.models import Evento;from academia.models import Alumno;from academia.models import Profesor;from academia.models import Boletin;from users.models import User;launion=Academia(nombre='La union');launion.save();elalgar=Academia(nombre='El algar');elalgar.save();aula1_launion=Aula(nombre='aula1',academia=launion);aula1_launion.save();aula1_elalgar=Aula(nombre='aula1',academia=elalgar);aula1_elalgar.save();	aula2_launion=Aula(nombre='aula2',academia=launion);aula2_launion.save();aula2_elalgar=Aula(nombre='aula2',academia=elalgar);aula2_elalgar.save();ingles_b1_launion=Curso(nombre='ingles_b1',descripcion='ingles_b1 la union',academia=launion,precio=10,ingles=True);ingles_b1_launion.save();ingles_b1_elalgar=Curso(nombre='ingles_b1',descripcion='ingles_b1 el algar',academia=elalgar,precio=10,ingles=True);ingles_b1_elalgar.save();mates_repaso_launion=Curso(nombre='mates',descripcion='mates_repaso la union',academia=launion,precio=10,ingles=False);mates_repaso_launion.save();mates_repaso_elalgar=Curso(nombre='mates',descripcion='mates_repaso elalgar',academia=elalgar,precio=10,ingles=False);mates_repaso_elalgar.save();alumno1_user = User(email='alumno1@gmail.com', username='alumno1', nombre='alumno1', primer_apellido='apellido_alumno', segundo_apellido='2apellido_alumno', is_verified=True, password='hierro20');alumno1_user.save();alumno2_user = User(email='alumno2@gmail.com', username='alumno2', nombre='alumno2', primer_apellido='apellido_alumno', segundo_apellido='2apellido_alumno', is_verified=True, password='hierro20');alumno2_user.save();profesor1_user = User(email='profesor1@gmail.com', username='profesor1', nombre='profesor1', primer_apellido='apellido_profesor', segundo_apellido='2apellido_profesor', is_verified=True, password='hierro20');profesor1_user.save();profesor2_user = User(email='profesor2@gmail.com', username='profesor2', nombre='profesor2', primer_apellido='apellido_profesor', segundo_apellido='2apellido_profesor', is_verified=True, password='hierro20');profesor2_user.save();profe1=Profesor(usuario=profesor1_user);profe1.save();profe2=Profesor(usuario=profesor2_user);profe2.save();lunes_10_12_ingles_la_union=Evento(dia_semana='L',nombre='lunes ingles 10 12 union',descripcion='descripcion evento',hora_inicio=time(10, 0),hora_fin=time(12, 0),curso=ingles_b1_launion,profesor=profe1,aula=aula1_launion);lunes_10_12_ingles_la_union.save();martes_12_14ingles_la_union=Evento(dia_semana='M',nombre='martes ingles 12 14 union',descripcion='descripcion evento',hora_inicio=time(12, 0),hora_fin=time(14, 0),curso=ingles_b1_launion,profesor=profe2,aula=aula2_launion);martes_12_14ingles_la_union.save();lunes_10_12_ingles_el_algar=Evento(dia_semana='L',nombre='lunes ingles 10 12 algar',descripcion='descripcion evento',hora_inicio=time(10, 0),hora_fin=time(12, 0),curso=ingles_b1_elalgar,profesor=profe1,aula=aula1_elalgar);lunes_10_12_ingles_el_algar.save();jueves_10_12_ingles_el_algar=Evento(dia_semana='L',nombre='lunes ingles 10 12 algar',descripcion='descripcion evento',hora_inicio=time(12, 0),hora_fin=time(14, 0),curso=ingles_b1_elalgar,profesor=profe1,aula=aula2_elalgar);jueves_10_12_ingles_el_algar.save();alumno1=Alumno(usuario=alumno1_user);alumno1.save();alumno1.curso.set([ingles_b1_elalgar.id, mates_repaso_elalgar.id]);"
	
