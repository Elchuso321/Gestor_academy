FROM python:3.10.9

LABEL ginessaez "ginessaez4800@gmail.com"

WORKDIR /usr/src/app/back

EXPOSE 8000

ENV PYTHONUNBUFFERED 1

ENV PYTHONDONTWRITEBYTECODE 1

COPY ./requirements.txt ./
RUN pip install --upgrade pip && \
pip install --no-cache-dir -r requirements.txt


ENTRYPOINT ["python3","manage.py","runserver","0.0.0.0:8000"]
