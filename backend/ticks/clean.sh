#!/bin/bash

if [ -d './api/migrations' ]
then
  rm -rf ./api/migrations
fi

if [ -d './api/__pycache__' ]
then
  rm -rf ./api/__pycache__
fi

rm db.sqlite3

source ../.env/bin/activate
python manage.py makemigrations api
python manage.py migrate
deactivate
