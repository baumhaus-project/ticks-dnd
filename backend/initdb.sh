#!/bin/bash
source .env/bin/activate
cd ./ticks || exit
python manage.py loaddata api/fixtures/*
cd .. || exit
deactivate