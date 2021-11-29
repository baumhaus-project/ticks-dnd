#!/bin/bash
if [ ! -d ".env" ]
then
  source setup.sh
fi

source .env/bin/activate
cd ./ticks || exit
python manage.py runserver