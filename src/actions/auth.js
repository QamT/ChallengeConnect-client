import jwtDecode from 'jwt-decode';

import * as types from './actionType';
import { API_BASE_URL } from '../config';
import { clearAuthToken, saveAuthToken } from '../local-storage';

export const setAuthToken = authToken => ({
  type: types.SET_AUTH_TOKEN,
  authToken
});

export const clearAuth = () => ({
  type: types.CLEAR_AUTH
});

export const authRequest = () => ({
  type: types.AUTH_REQUEST
});

export const authSuccess = currentUser => ({
  type: types.AUTH_SUCCESS,
  currentUser
});

export const authError = error => ({
  type: types.AUTH_ERROR,
  error
});

export const clearAuthError = () => ({
  type: types.CLEAR_AUTH_ERROR
})

const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken);
}

export const login = (username, password) => dispatch => {
  dispatch(authRequest());

  fetch(`${API_BASE_URL}api/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(res => {
    if (res.status === 401) return Promise.reject('Invalid username or password');
    return res.json();
  })
  .then(({ token }) => storeAuthInfo(token, dispatch))
  .catch(err => dispatch(authError(err)))
}

export const logout = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(clearAuth());
  clearAuthToken(authToken);
}

export const refreshAuthToken = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}api/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
  })
  .then(res => res.json())
  .then(({ token }) => storeAuthInfo(token, dispatch))
  .catch(err => {
    dispatch(authError(err));
    dispatch(clearAuth());
    clearAuthToken(authToken);
  })
}