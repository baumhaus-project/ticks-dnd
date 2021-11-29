export const put = ({ url, payload }) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const post = ({ url, payload }) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const remove = ({ url }) => {
  return fetch(url, {
    method: 'DELETE',
  });
};
