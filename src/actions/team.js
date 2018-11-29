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