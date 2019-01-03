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

export const clearAdminError = () => ({
  type: types.CLEAR_ADMIN_ERROR
})

export const adminRequest = () => ({
  type: types.ADMIN_REQUEST
});

export const acceptUserSuccess = admin => ({
  type: types.ACCEPT_USER_SUCCESS,
  admin
});

export const rejectUserSuccess = admin => ({
  type: types.REJECT_USER_SUCCESS,
  admin
});

export const acceptChallengeProofSuccess = admin => ({
  type: types.ACCEPT_CHALLENGE_PROOF_SUCCESS,
  admin
});

export const denyChallengeProofSuccess = admin => ({
  type: types.DENY_CHALLENGE_PROOF_SUCCESS,
  admin
});

export const addMemberA = team => ({
  type: types.ADD_MEMBER_A,
  team
});

export const addMemberB = team => ({
  type: types.ADD_MEMBER_B,
  team
});

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

export const refreshAdminInfo = adminId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const currentRequests = getState().admin.userRequests.length;
  const currentChallenged = getState().admin.proofChallenged.length;

  fetch(`${API_BASE_URL}admin/${adminId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(admin => {
    if (currentRequests !== admin.usersRequest.length || currentChallenged !== admin.proofChallenged.length) {
      dispatch(adminSuccess(admin));
    }
  })
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
  .then(data => {
    const { admin, team = '', message = '' } = data;
    if (message) dispatch(adminError(data));
    if (!message) dispatch(acceptUserSuccess(admin));
    if (team) group === 'a' ? dispatch(addMemberA(team)) : dispatch(addMemberB(team));
  })
  .catch(e => dispatch(adminError(e)))
}

export const rejectUser = (adminId, userId, challengeId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}admin/rejectUser`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ adminId, userId, challengeId })
  })
  .then(res => res.json())
  .then(data => dispatch(rejectUserSuccess(data)))
  .catch(e => dispatch(adminError(e)))
}

export const acceptChallengeProof = (proofId, adminId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}admin/acceptProof`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ proofId, adminId })
  })
  .then(res => res.json())
  .then(data => dispatch(acceptChallengeProofSuccess(data)))
  .catch(e => dispatch(adminError(e)));
}

export const denyChallengeProof = (proofId, adminId, userId, teamId, group) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  
  fetch(`${API_BASE_URL}admin/denyProof`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ proofId, adminId, userId, teamId, group })
  })
  .then(res => res.json())
  .then(data => dispatch(denyChallengeProofSuccess(data)))
  .catch(e => dispatch(adminError(e)))
}