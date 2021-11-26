import requests
import json


headers_ = {
    'Content-Type': 'application/json'
}

api_url = 'http://127.0.0.1:8000/api/'


def get(endpoint, params=[]):
    global headers_
    global api_url

    r_str = api_url + endpoint
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

    r_str = api_url + endpoint
    r = requests.post(r_str, data=json.dumps(e), headers=headers_)

    return {'status': r.status_code}


def put(e, endpoint):
    global headers_

    r_str = api_url + endpoint
    r = requests.put(r_str, data=json.dumps(e), headers=headers_)

    return {'status': r.status_code}


def delete(endpoint):
    global headers_

    r_str = api_url + endpoint
    r = requests.delete(r_str, headers=headers_)

    return {'status': r.status_code}


def get_cmp_psd_id():
    r = get('schemas')
    for schema in r['data']:
        if schema['name'] == 'cmp_psd':
            return schema['id']


def test_endpoint(obj1, obj2, key, url):
    print('TEST: ', url)

    r1 = post(obj1, url)
    if r1['status'] != 201:
        print(url, ': POST failed')
        return

    pk = 0
    r_get = get(url)
    for m in r_get['data']:
        if m[key] == 'test':
            pk = m['id']
            break

    r2 = put(obj2, f'{url}/{pk}')
    if r2['status'] != 200:
        print(url, ': PUT failed')
        return

    r3 = get(f'{url}/{pk}')
    if r3['status'] != 200 or r3['data'][key] != 'test2':
        print(url, ': GET failed')
        return

    r_del = delete(f'{url}/{pk}')
    if r_del['status'] != 204:
        print(url, ': DELETE failed')
        return

    print('... Ok\n')


def test():
    test_endpoint(
        {
            'title': 'test',
            'customer': 'sfa'
        },
        {
            'title': 'test2',
            'customer': 'sfb'
        },
        'title',
        'tickets'
    )
