import * as types from './actionType';

export const fetchChallengeSuccess = () => ({
  type: types.FETCH_CHALLENGE_SUCCESS
});

export const fetchChallengeActive = () => ({
  type: types.FETCH_CHALLENGE_ACTIVE
});

export const fetchChallengeComplete = () => ({
  type: types.FETCH_CHALLENGE_COMPLETE
});

export const fetchProofChallenged = () => ({
  type: types.FETCH_PROOF_CHALLENGED
});

export const fetchChallengesSuccess = () => ({
  type: types.FETCH_CHALLENGES_SUCCESS
});

export const addChallenge = () => ({
  type: types.ADD_CHALLENGE
});

//fetch from api function
