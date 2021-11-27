#!/bin/bash
source .env/bin/activate
cd ./ticks || exit
python manage.py loaddata api/data/persons.json
python manage.py loaddata api/data/tickets.json
cd .. || exit
deactivate