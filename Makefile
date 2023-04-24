include .env
up:
	docker compose up
start:
	docker compose up -d
init:
	docker compose up --build -d
	echo "10s Para continuar" && sleep 10
	docker exec -it ${APP_NAME}-server python manage.py makemigrations
	docker exec -it ${APP_NAME}-server python manage.py migrate
	docker exec -it ${APP_NAME}-server python manage.py createsuperuser
	docker compose down
	docker compose up
migrate:
	docker exec -it ${APP_NAME}-server python manage.py makemigrations
	docker exec -it ${APP_NAME}-server python manage.py migrate
bash-client:
	docker exec -it ${APP_NAME}-client /bin/bash
bash-server:
	docker exec -it ${APP_NAME}-server /bin/bash
bash-database:
	docker exec -it ${APP_NAME}-db /bin/bash
