import * as types from './actionType';
import { API_BASE_URL } from '../config';

export const challengeSuccess = challenge => ({
  type: types.CHALLENGE_SUCCESS,
  challenge
});

export const challengeError = error => ({
  type: types.CHALLENGE_ERROR,
  error
});

export const challengeRequest = () => ({
  type: types.CHALLENGE_REQUEST
});

export const activateChallengeSuccess = challenge => ({
  type: types.ACTIVATE_CHALLENGE_SUCCESS,
  challenge
});

export const completeChallengeSuccess = challenge => ({
  type: types.COMPLETE_CHALLENGE_SUCCESS,
  challenge
});

export const updateActiveStatus = () => ({
  type: types.UPDATE_ACTIVE_STATUS
});

export const updateCompleteStatus = challenge => ({
  type: types.UPDATE_COMPLETE_STATUS
});

export const startChallengeTimerSuccess = time => ({
  type: types.START_CHALLENGE_TIMER_SUCCESS,
  time
});

export const endChallengeTimerSuccess = () => ({
  type: types.END_CHALLENGE_TIMER_SUCCESS
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
    if (active) dispatch(updateActiveStatus());
  })
  .catch(e => dispatch(challengeError(e)))
}

export const fetchIsComplete = challengeId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}challenge/${challengeId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(({ winner, completedTime }) => {
    if (winner) dispatch(updateCompleteStatus(winner));
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
  .then(data => dispatch(activateChallengeSuccess(data)))
  .catch(e => dispatch(challengeError(e)))
}

export const completeChallenge = (challengeId, teamId, winner) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}challenge/complete`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId, teamId, winner })
  })
  .then(res => res.json())
  .then(data => dispatch(completeChallengeSuccess(data)))
  .catch(e => dispatch(challengeError(e)))
}

export const startChallengeTimer = challengeId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}challenge/startTimer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId })
  })
  .then(res => res.json())
  .then(data => dispatch(startChallengeTimerSuccess(data)))
  .catch(e => dispatch(challengeError(e)))
}

export const endChallengeTimer = challengeId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  
  fetch(`${API_BASE_URL}challenge/endTimer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId })
  })
  .then(res => res.json())
  .then(data => dispatch(endChallengeTimerSuccess()))
  .catch(e => dispatch(challengeError(e)))
}


