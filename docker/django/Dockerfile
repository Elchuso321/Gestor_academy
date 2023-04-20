FROM python:3.10

LABEL ginessaez "ginessaez4800@gmail.com"

WORKDIR /usr/src/app

EXPOSE 8000

ENV PYTHONUNBUFFERED 1

ENV PYTHONDONTWRITEBYTECODE 1

COPY ./requirements.txt ./
RUN pip install --upgrade pip && \
pip install --no-cache-dir -r requirements.txt && \
pip install djangorestframework && \
pip install django-cors-headers && \
pip install psycopg2 && \
pip install python-decouple



ENTRYPOINT ["python","manage.py","runserver","0.0.0.0:8000"]
