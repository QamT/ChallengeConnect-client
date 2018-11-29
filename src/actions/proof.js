import * as types from './actionType';
import { API_BASE_URL } from '../config';

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