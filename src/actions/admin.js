import * as types from './actionType';
import { API_BASE_URL } from '../config';

export const adminSuccess = admin => ({
  type: types.ADMIN_SUCCESS,
  admin
});

export const adminError = error => ({
  type: types.ADMIN_ERROR,
  error
});

export const adminRequest = () => ({
  type: types.ADMIN_REQUEST
});

export const acceptUserSuccess = (admin) => ({
  type: types.ACCEPT_USER_SUCCESS,
  admin
});

export const rejectUserSuccess = admin => ({
  type: types.REJECT_USER_SUCCESS,
  admin
})

export const fetchAdmin = adminId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}admin/${adminId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => dispatch(adminSuccess(data)))
  .catch(e => dispatch(adminError(e)))
}

export const acceptUser = (adminId, userId, challengeId, group, teamId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}admin/acceptUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ adminId, userId, challengeId, group, teamId })
  })
  .then(res => res.json())
  .then(data => dispatch(acceptUserSuccess(data)))
  .catch(e => dispatch(adminError(e)))
}

export const rejectUser = (adminId, userId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}admin/rejectUser`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ adminId, userId })
  })
  .then(res => res.json())
  .then(data => dispatch(rejectUserSuccess(data)))
  .catch(e => dispatch(adminError(e)))
}