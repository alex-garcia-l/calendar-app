import { fetchWithToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch.jsx', () => {
  test('fetchWithToken debe llamarse correctamente', () => {
    const res = fetchWithToken('auth/login', { email: 'mail@mail.com', password: 'password0' }, 'POST');
  });
});
