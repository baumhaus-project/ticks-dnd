#!/bin/bash
python3 -m venv .env
source .env/bin/activate
pip install -r requirements.txt

cd ./ticks || exit
python manage.py makemigrations
python manage.py makemigrations api
python manage.py migrate
cd .. || exit

deactivate
source initdb.sh

