import Swal from 'sweetalert2';

import { fetchNotToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
import { calendarReset } from './calendar';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const body = { email, password };
    const res = await fetchNotToken('auth/login', body, 'POST');
    const bodyRes = await res.json();

    if (res.ok) {
      const { user, tokenType, accessToken, iat, exp } = bodyRes;

      localStorage.setItem('token', `${tokenType} ${accessToken}`);
      localStorage.setItem('token-iat', iat);
      localStorage.setItem('token-exp', exp);

      dispatch(login(user));
    } else {
      if (bodyRes.msg) {
        Swal.fire('Error', bodyRes.msg, 'error');
      } else {
        return bodyRes;
      }
    }
  };
};

export const startRegister = (name, email, password, password_confirm) => {
  return async (dispatch) => {
    const body = { name, email, password, password_confirm };
    const res = await fetchNotToken('auth/register', body, 'POST');
    const bodyRes = await res.json();

    if (res.ok) {
      const { user, tokenType, accessToken, iat, exp } = bodyRes;

      localStorage.setItem('token', `${tokenType} ${accessToken}`);
      localStorage.setItem('token-iat', iat);
      localStorage.setItem('token-exp', exp);

      dispatch(login(user));
    } else {
      if (bodyRes.msg) {
        Swal.fire('Error', bodyRes.msg, 'error');
      } else {
        return bodyRes;
      }
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const res = await fetchWithToken('auth/renovate-token');
    const bodyRes = await res.json();

    if (res.ok) {
      const { user, tokenType, accessToken, iat, exp } = bodyRes;

      localStorage.setItem('token', `${tokenType} ${accessToken}`);
      localStorage.setItem('token-iat', iat);
      localStorage.setItem('token-exp', exp);

      dispatch(login(user));
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(calendarReset());
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const logout = () => ({ type: types.authLogout });
