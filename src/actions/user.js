import * as types from './actionType';
import { API_BASE_URL } from '../config';

export const userInfoSuccess = userInfo => ({
  type: types.USER_INFO_SUCCESS,
  userInfo
})

export const userInfoError = error => ({
  type: types.USER_INFO_ERROR,
  error
})

export const userRequest = () => ({
  type: types.USER_REQUEST
})

export const fetchUserInfo = () => (dispatch, getState) => {
  dispatch(userRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}user/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => dispatch(userInfoSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}



