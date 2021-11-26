"""
WSGI config for ticks project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

<<<<<<< HEAD
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ticks.settings.development')
=======
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ticks.settings')
>>>>>>> 0a9135fed5852d1ae7f6058f4ff2fc7beb693340

application = get_wsgi_application()
