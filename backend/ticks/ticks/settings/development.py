from ticks.settings.base import *

# Override base.py settings here
DEBUG = True
API_SERVER = "http://127.0.0.1:8000/api/"
ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
