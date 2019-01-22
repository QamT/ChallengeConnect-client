import * as types from '../actions/actionType';
import { API_BASE_URL } from '../config';
import axios from 'axios';

export const teamSuccess = teams => ({
  type: types.TEAM_SUCCESS,
  teams
});

export const teamError = error => ({
  type: types.TEAM_ERROR,
  error
});

export const teamRequest = () => ({
  type: types.TEAM_REQUEST
});

export const decreaseScoreA = () => ({
  type: types.DECREASE_SCORE_A
});

export const decreaseScoreB = () => ({
  type: types.DECREASE_SCORE_B
});

export const refreshTeamInfoSuccess = teams => ({
  type: types.REFRESH_TEAM_INFO_SUCCESS,
  teams
});

export const refreshScoreSuccess = teams => ({
  type: types.REFRESH_SCORE_SUCCESS,
  teams
});

export const refreshProofsSuccess = teams => ({
  type: types.REFRESH_PROOFS_SUCCESS,
  teams
});

export const uploadProofSuccess = teams => ({
  type: types.UPLOAD_PROOF_SUCCESS,
  teams
});

export const challengeProofSuccess = teams => ({
  type: types.CHALLENGE_PROOF_SUCCESS,
  teams
});

export const clearProof = proof => ({
  type: types.CLEAR_PROOF,
  proof
});

export const deleteProof = proof => ({
  type: types.DELETE_PROOF,
  proof
});

export const fetchTeams = teamId => (dispatch, getState) => {
  dispatch(teamRequest());
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}team/${teamId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => dispatch(teamSuccess(data)))
  .catch(e => dispatch(teamError(e)))
}

export const refreshTeamInfo = teamId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const membersA = getState().team.teamA.members.length;
  const membersB = getState().team.teamB.members.length;
  const scoreA = getState().team.teamA.score;
  const scoreB = getState().team.teamB.score;
  const proofsA = JSON.stringify(getState().team.teamA.proofs);
  const proofsB = JSON.stringify(getState().team.teamB.proofs);
  const active = getState().challenge.active;

  fetch(`${API_BASE_URL}team/${teamId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(data => {
    const { teamA, teamB } = data;
    if (!active && ((teamA.team.length !== membersA) || (teamB.team.length !== membersB))) {
      dispatch(refreshTeamInfoSuccess(data));
    }
    if (active && ((scoreA !== teamA.score) || (scoreB !== teamB.score))) dispatch(refreshScoreSuccess(data));
    if (active && ((JSON.stringify(teamA.proofs) !== proofsA) || JSON.stringify(teamB.proofs) !== proofsB)) {
      dispatch(refreshProofsSuccess(data));
    }
  })
  .catch(e => dispatch(teamError(e)))
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
  .then(({ data }) => dispatch(uploadProofSuccess(data)))
  .catch(error => dispatch(teamError(error)))
}

export const challengeProof = (proofId, adminId, teamId, reason) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  
  fetch(`${API_BASE_URL}team/challengeProof`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ proofId, adminId, teamId, reason }),
  })
  .then(res => res.json())
  .then(data => dispatch(challengeProofSuccess(data)))
  .catch(e => dispatch(teamError(e)));
}