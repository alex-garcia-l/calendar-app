const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const fetchNotToken = (endpoind, data = {}, method = 'GET') => {
  const url = `${BASE_URL}/${endpoind}`;

  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = (endpoind, data = {}, method = 'GET') => {
  const url = `${BASE_URL}/${endpoind}`;
  const token = localStorage.getItem('token') || '';

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
  }
};
