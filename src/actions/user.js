import * as types from './actionType';
import { API_BASE_URL } from '../config';
import { login } from './auth';
import axios from 'axios';

export const userInfoSuccess = user => ({
  type: types.USER_INFO_SUCCESS,
  user
});

export const registerDetailsSuccess = details => ({
  type: types.REGISTER_DETAILS_SUCCESS,
  details
})

export const refreshUserChallengeSuccess = challenge => ({
  type: types.REFRESH_USER_CHALLENGE_SUCCESS,
  challenge
});

export const refresChallengeRequestSuccess = requests => ({
  type: types.REFRESH_CHALLENGE_REQUEST_SUCCESS,
  requests
});

export const userInfoError = error => ({
  type: types.USER_INFO_ERROR,
  error
});

export const userRequest = () => ({
  type: types.USER_REQUEST
});

export const requestChallengeSuccess = challenge => ({
  type: types.REQUEST_CHALLENGE,
  challenge
});

export const addChallengeSuccess = challenge => ({
  type: types.ADD_CHALLENGE_SUCCESS,
  challenge
});

export const sendChallengeSuccess = requested => ({
  type: types.SEND_CHALLENGE_SUCCESS,
  requested
});

export const acceptChallengeSuccess = challenge => ({
  type: types.ACCEPT_CHALLENGE_SUCCESS,
  challenge
});

export const rejectChallengeSuccess = requests => ({
  type: types.REJECT_CHALLENGE_SUCCESS,
  requests
});

export const resetUserChallengeSuccess = () => ({
  type: types.RESET_USER_CHALLENGE_SUCCESS
});

export const sendFriendRequestSuccess = requested => ({
  type: types.SEND_FRIEND_REQUEST_SUCCESS,
  requested
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

export const refreshFriendInfoSuccess = info => ({
  type: types.REFRESH_FRIEND_INFO_SUCCESS,
  info
});

export const clearUserError = () => ({
  type: types.CLEAR_USER_ERROR
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

export const registerUser = user => dispatch => {
  fetch(`${API_BASE_URL}user/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => {
    if (!res.ok) return res.json().then(res => Promise.reject(res));
    return res.json()})
  .then(res => dispatch(login(user.username, user.password)))
  .catch(e => dispatch(userInfoError(e)));
}

export const registerUserDetails = (user, file) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const data = new FormData();
  if (Object.keys(user).length) data.append('user', JSON.stringify(user));
  if (file) data.append('profile', file);

  axios.post(`${API_BASE_URL}user/profile`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(({ data }) => dispatch(registerDetailsSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}

export const refreshUserInfo = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const challengeId = getState().user.currentChallenge;
  const challRequests = JSON.stringify(getState().user.challengeRequests);
  const friendsList = getState().user.friends.length;
  const requests = getState().user.friendRequests.length;
  const requested = getState().user.friendRequested.length;

  fetch(`${API_BASE_URL}user/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(({ currentChallenge, friends, challengeRequests }) => {
    const { list, friendRequests, friendRequested } = friends;
    if (currentChallenge.id !== challengeId) dispatch(refreshUserChallengeSuccess(currentChallenge.id));
    if (list.length !== friendsList|| friendRequests.length !== requests || friendRequested.length !== requested) {
      dispatch(refreshFriendInfoSuccess(friends));
    }
    if (!challengeId && JSON.stringify(challengeRequests) !== challRequests) dispatch(refresChallengeRequestSuccess(challengeRequests));
  })
  .catch(e => dispatch(userInfoError(e)));
}

export const requestChallenge = (challengeId, adminId, group) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}challenge/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId, adminId, group })
  })
  .then(res => res.json())
  .then(data => dispatch(requestChallengeSuccess(data)))
  .catch(e => userInfoError(e));
}

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

export const sendChallenge = (challengeId, userId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}challenge/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId, userId })
  })
  .then(res => res.json())
  .then(data => dispatch(sendChallengeSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}

export const acceptChallenge = (userId, challengeId, teamId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}challenge/accept`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ userId, challengeId, teamId })
  })
  .then(res => res.json())
  .then(data => dispatch(acceptChallengeSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}

export const rejectChallenge = userId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}challenge/reject`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => dispatch(rejectChallengeSuccess(data)))
  .catch(e => dispatch(userInfoError(e)));
}

export const resetChallenge = (challengeId, teamId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}user/reset`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ challengeId, teamId })
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
