import * as types from './actionType';
import { API_BASE_URL } from '../config';

export const challengeSuccess = (challenge) => ({
  type: types.CHALLENGE_SUCCESS,
  challenge
});

export const challengeError = (error) => ({
  type: types.CHALLENGE_ERROR,
  error
});

export const challengeRequest = () => ({
  type: types.CHALLENGE_REQUEST
});

export const fetchChallenge = challengeId => (dispatch, getState) => {
  dispatch(challengeRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}challenge/${challengeId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => dispatch(challengeSuccess(data)))
  .catch(e => dispatch(challengeError(e)))
}