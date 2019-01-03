import * as types from '../actions/actionType';
import { API_BASE_URL } from '../config';

export const teamSuccess = (teamData) => ({
  type: types.TEAM_SUCCESS,
  teamData
});

export const teamError = (error) => ({
  type: types.TEAM_ERROR,
  error
});

export const teamRequest = () => ({
  type: types.TEAM_REQUEST
});

export const addMemberA = user => ({
  type: types.ADD_MEMBER_A,
  user
});

export const addMemberB = user => ({
  type: types.ADD_MEMBER_B,
  user
});

export const addScoreA = () => ({
  type: types.ADD_SCORE_A
});

export const addScoreB = () => ({
  type: types.ADD_SCORE_B
});

export const decreaseScoreA = () => ({
  type: types.DECREASE_SCORE_A
});

export const decreaseScoreB = () => ({
  type: types.DECREASE_SCORE_B
});

export const refreshTeamAInfoSuccess = teamA => ({
  type: types.REFRESH_TEAM_A_INFO_SUCCESS,
  teamA
});

export const refreshTeamBInfoSuccess = teamB => ({
  type: types.REFRESH_TEAM_B_INFO_SUCCESS,
  teamB
});

export const refreshScoreSuccess = teams => ({
  type: types.REFRESH_SCORE_SUCCESS,
  teams
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

export const refreshTeamInfo = (teamId, team) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const members = team === 'a' ? getState().team.teamA.members.length : getState().team.teamB.members.length;
  fetch(`${API_BASE_URL}team/${teamId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(({ teamA, teamB }) => {
    if ((teamA.team.length !== members && team === 'a') || (teamB.team.length !== members && team === 'b')) {
      team === 'a' ? dispatch(refreshTeamAInfoSuccess(teamA)) : dispatch(refreshTeamBInfoSuccess(teamB));
    }
  })
  .catch(e => dispatch(teamError(e)))
}

export const refreshScore = teamId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const scoreA = getState().team.teamA.score;
  const scoreB = getState().team.teamB.score;
  fetch(`${API_BASE_URL}team/${teamId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(teams => {
    if (teams.teamA.score !== scoreA || teams.teamB.score !== scoreB) {
      dispatch(refreshScoreSuccess(teams));
    }
  })
  .catch(e => dispatch(teamError(e)))
}