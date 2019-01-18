import * as types from './actionType';
import { API_BASE_URL } from '../config';

export const allChallengesSuccess = challenges => ({
  type: types.ALL_CHALLENGES_SUCCESS,
  challenges
});

export const allChallengesError = error => ({
  type: types.ALL_CHALLENGES_ERROR,
  error
});

export const allChallengesRequest = () => ({
  type: types.ALL_CHALLENGES_REQUEST
});

export const leaderboardSuccess = leaderboard => ({
  type: types.LEADERBOARD_SUCCESS,
  leaderboard
});

export const leaderboardError = error => ({
  type: types.LEADERBOARD_ERROR,
  error
});

export const leaderboardRequest = () => ({
  type: types.LEADERBOARD_REQUEST
});

export const searchUserSuccess = users => ({
  type: types.SEARCH_USER_SUCCESS,
  users
});

export const searchUserRequest = () => ({
  type: types.SEARCH_USER_REQUEST
});

export const searchUserError = error => ({
  type: types.SEARCH_USER_ERROR,
  error
});

export const clearResults = () => ({
  type: types.CLEAR_RESULTS
});

export const fetchAllChallenges = () => (dispatch) => {
  dispatch(allChallengesRequest());

  fetch(`${API_BASE_URL}globalData/getChallenges`)
  .then(res => res.json())
  .then(data => dispatch(allChallengesSuccess(data)))
  .catch(e => dispatch(allChallengesError(e)))
}

export const fetchLeaderboard = () => (dispatch) => {
  dispatch(leaderboardRequest());

  fetch(`${API_BASE_URL}globalData/leaderboard`)
  .then(res => res.json())
  .then(({ leaderboard }) => dispatch(leaderboardSuccess(leaderboard)))
  .catch(e => dispatch(leaderboardError(e)))
}

export const fetchResults = name => (dispatch) => {
  dispatch(searchUserRequest());

  fetch(`${API_BASE_URL}globalData/findUser/${name}`)
  .then(res => res.json())
  .then(data => dispatch(searchUserSuccess(data)))
  .catch(e => dispatch(searchUserError(e)));
}