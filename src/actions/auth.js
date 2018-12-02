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

const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken);
}

export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return (
<<<<<<< HEAD
    fetch(`${API_BASE_URL}api/login`, {
=======
    fetch(`${API_BASE_URL}/api/login`, {
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => res.json())
<<<<<<< HEAD
    .then(({ token }) => storeAuthInfo(token, dispatch))
=======
    .then(({ token }) => storeAuthInfo(token))
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
    .catch(err => dispatch(authError(err)))
  )
}

export const logout = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(clearAuth());
  clearAuthToken(authToken);
}