import * as types from './actionType';
import { API_BASE_URL } from '../config';

export const allChallengesSuccess = (challenges) => ({
  type: types.ALL_CHALLENGES_SUCCESS,
  challenges
});

export const allChallengesError = (error) => ({
  type: types.ALL_CHALLENGES_ERROR,
  error
});

export const allChallengesRequest = () => ({
  type: types.ALL_CHALLENGES_REQUEST
});

export const fetchAllChallenges = () => (dispatch) => {
  dispatch(allChallengesRequest());
  fetch(`${API_BASE_URL}globalData/getChallenges`)
  .then(res => res.json())
  .then(data => dispatch(allChallengesSuccess(data)))
  .catch(e => dispatch(allChallengesError(e)))
}