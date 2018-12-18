import * as types from './actionType';
import { API_BASE_URL } from '../config';

const axios = require("axios");

export const proofSuccessA = proofs => ({
  type: types.PROOF_SUCCESSA,
  proofs
});

export const proofSuccessB = proofs => ({
  type: types.PROOF_SUCCESSB,
  proofs
});

export const proofError = error => ({
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

export const clearProof = proof => ({
  type: types.CLEAR_PROOF,
  proof
});

export const deleteProof = proof => ({
  type: types.DELETE_PROOF,
  proof
});

export const fetchProofs = (proofIds, team) => (dispatch, getState) => {
  dispatch(proofRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}team/proof/${proofIds}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => team==='a' ? dispatch(proofSuccessA(data)) : dispatch(proofSuccessB(data)))
  .catch(error => dispatch(proofError(error)));
}

export const refreshProofsInfo = (proofIds, team) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const proofs = team === 'a' ? getState().proof.proofA : getState().proof.proofB;
  fetch(`${API_BASE_URL}team/proof/${proofIds}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => {
    if (JSON.stringify(data) !== JSON.stringify(proofs)) {
      team==='a' ? dispatch(proofSuccessA(data)) : dispatch(proofSuccessB(data));
    }
  })
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
  .then(data => dispatch(uploadProofSuccess(data.data)))
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

