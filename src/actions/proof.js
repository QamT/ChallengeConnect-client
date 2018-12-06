import * as types from './actionType';
import { API_BASE_URL } from '../config';

const axios = require("axios");

export const proofSuccessA = (proof) => ({
  type: types.PROOF_SUCCESSA,
  proof
});

export const proofSuccessB = (proof) => ({
  type: types.PROOF_SUCCESSB,
  proof
});

export const proofError = (error) => ({
  type: types.PROOF_ERROR,
  error
});

export const proofRequest = () => ({
  type: types.PROOF_REQUEST
});

export const uploadProofSuccess = proof => ({
  type: types.UPLOAD_PROOF_SUCCESS,
  proof
});

export const challengeProofSuccess = proof => ({
  type: types.CHALLENGE_PROOF_SUCCESS,
  proof
});

export const fetchProof = (proofId, team='a') => (dispatch, getState) => {
  dispatch(proofRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}team/proof/${proofId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => team==='a' ? dispatch(proofSuccessA(data)) : dispatch(proofSuccessB(data)))
  .catch(error => dispatch(proofError(error)));
}

export const uploadProof = (proofId, teamId, group, file) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const data = new FormData();
  data.append('proof', file);
  data.append('proofId', proofId);
  data.append('teamId', teamId);
  data.append('group', group);
  axios.put(`${API_BASE_URL}team/uploadProof`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(data => dispatch(uploadProofSuccess(data)))
  .catch(error => dispatch(proofError(error)))
}

export const challengeProof = (proofId, adminId, reason) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}team/challengeProof`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ proofId, adminId, reason }),
  })
  .then(res => res.json())
  .then(data => dispatch(challengeProofSuccess(data)))
  .catch(error => dispatch(proofError(error)));
}

