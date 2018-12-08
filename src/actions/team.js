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