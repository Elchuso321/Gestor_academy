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
