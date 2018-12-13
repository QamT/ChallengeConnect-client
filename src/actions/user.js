import * as types from './actionType';
import { API_BASE_URL } from '../config';

export const userInfoSuccess = userInfo => ({
  type: types.USER_INFO_SUCCESS,
  userInfo
});

export const refreshUserInfoSuccess = challenge => ({
  type: types.REFRESH_USER_INFO_SUCCESS,
  challenge
})

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

export const fetchChallengeInfoSuccess = challenge => ({
  type: types.FETCH_CHALLENGE_INFO_SUCCESS,
  challenge
});

export const addChallengeSuccess = challenge => ({
  type: types.ADD_CHALLENGE_SUCCESS,
  challenge
});

export const resetUserChallengeSuccess = () => ({
  type: types.RESET_USER_CHALLENGE_SUCCESS
});

export const sendFriendRequestSuccess = requests => ({
  type: types.SEND_FRIEND_REQUEST_SUCCESS,
  requests
});

export const acceptFriendRequestSuccess = user => ({
  type: types.ACCEPT_FRIEND_REQUEST_SUCCESS,
  user
});

export const rejectFriendRequestSuccess = requests => ({
  type: types.REJECT_FRIEND_REQUEST_SUCCESS,
  requests
});

export const removeFriendSuccess = list => ({
  type: types.REMOVE_FRIEND_SUCCESS,
  list
});

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

export const refreshUserInfo = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const challengeId = getState().user.currentChallenge;
  fetch(`${API_BASE_URL}user/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(({ currentChallenge }) => {
    if (currentChallenge.id !== challengeId) dispatch(refreshUserInfoSuccess(currentChallenge.id));
  })
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

export const addChallenge = (data) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}challenge/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ title: data.title, challenges: data.challenges })
  })
  .then(res => res.json())
  .then(data => dispatch(addChallengeSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}

export const resetChallenge = (challengeId, adminId, teamId, proofs) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}user/reset`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId, adminId, teamId, proofs })
  })
  .then(res => res.json())
  .then(data => dispatch(resetUserChallengeSuccess()))
  .catch(e => dispatch(userInfoError(e)));
}

export const sendFriendRequest = userId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}user/friend/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => dispatch(sendFriendRequestSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}

export const acceptFriendRequest = userId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}user/friend/accept`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => dispatch(acceptFriendRequestSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}

export const rejectFriendRequest = userId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}user/friend/reject`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => dispatch(rejectFriendRequestSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}

export const removeFriend = userId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}user/friend/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => dispatch(removeFriendSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}
