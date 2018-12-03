import * as types from './actionType';
import { API_BASE_URL } from '../config';

export const userInfoSuccess = userInfo => ({
  type: types.USER_INFO_SUCCESS,
  userInfo
});

export const userInfoError = error => ({
  type: types.USER_INFO_ERROR,
  error
});

export const userRequest = () => ({
  type: types.USER_REQUEST
});

export const requestChallengeSuccess = (challenge, title) => ({
  type: types.REQUEST_CHALLENGE_SUCCESS,
  challenge,
  title
});

export const fetchChallengeInfoSuccess = (challenge) => ({
  type: types.FETCH_CHALLENGE_INFO_SUCCESS,
  challenge
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

export const requestChallenge = (challengeId, adminId, group, teamId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}challenge/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({challengeId, adminId, group, teamId})
  })
  .then(res => res.json())
  .then(data => dispatch(requestChallengeSuccess(data)))
  .catch(e => userInfoError(e));
}

export const fetchChallengeInfo = challengeId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}challenge/${challengeId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => dispatch(fetchChallengeInfoSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
};



