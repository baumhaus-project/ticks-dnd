#!/bin/bash
source .env/bin/activate
cd ./ticks || exit
python manage.py runserver &
python manage.py shell < init_db.py
kill $!
cd .. || exit
deactivate

