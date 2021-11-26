from api.requests import get, post, put, delete


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
