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

export const activateChallengeSuccess = () => ({
  type: types.ACTIVATE_CHALLENGE_SUCCESS
});

export const completeChallengeSuccess = () => ({
  type: types.COMPLETE_CHALLENGE_SUCCESS
});

export const challengeActiveSuccess = () => ({
  type: types.CHALLENGE_ACTIVE_SUCCESS
})

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

export const fetchIsActive = challengeId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}challenge/${challengeId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(({ active }) => {
    if (active) dispatch(challengeActiveSuccess());
  })
  .catch(e => dispatch(challengeError(e)))
}

export const activateChallenge = challengeId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}challenge/activate`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId })
  })
  .then(res => res.json())
  .then(data => dispatch(activateChallengeSuccess()))
  .catch(e => dispatch(challengeError(e)))
}

export const completeChallenge = (challengeId, teamId, group) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}challenge/complete`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId, teamId, group })
  })
  .then(res => res.json())
  .then(data => dispatch(completeChallengeSuccess()))
  .catch(e => dispatch(challengeError(e)))
}


