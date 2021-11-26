from django.conf import settings
from urllib.parse import urljoin
import requests
import json

headers_ = {
    'Content-Type': 'application/json'
}

def get(endpoint, params=[]):
    global headers_

    r_str = settings.API_SERVER + endpoint
    if params:
        r_str = r_str + '?'
        param_cnt = 1
        for p in params:
            if param_cnt > 1:
                r_str = r_str + '&'
            r_str = r_str + p['param'] + "=" + p['val']
            param_cnt = param_cnt + 1

    r = requests.get(r_str, headers=headers_)
    data = r.json()

    return {'status': r.status_code, 'data': data}


def post(e, endpoint):
    global headers_
         
    r_str = urljoin(settings.API_SERVER, endpoint)
    r = requests.post(r_str, data=json.dumps(e), headers=headers_)

    return {'status': r.status_code}


def put(e, endpoint):
    global headers_

    r_str = settings.API_SERVER + endpoint
    r = requests.put(r_str, data=json.dumps(e), headers=headers_)

    return {'status': r.status_code}


def delete(endpoint):
    global headers_

    r_str = settings.API_SERVER + endpoint
    r = requests.delete(r_str, headers=headers_)

    return {'status': r.status_code}