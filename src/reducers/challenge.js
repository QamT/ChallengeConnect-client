import * as types from '../actions/actionType';

const initialState = {
  challengeId: null,
  adminId: null,
  title: '',
  challenges: [],
  teamId: null,
  active: false,
  completed: false,
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        challengeId: action.challenge.id,
        adminId: action.challenge.admin,
        title: action.challenge.title,
        challenges: [...action.challenge.challenges],
        teamId: action.challenge.teams,
        active: action.challenge.active,
        completed: action.challenge.completed
      });

    case types.CHALLENGE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    case types.CHALLENGE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.ACTIVATE_CHALLENGE_SUCCESS: 
      return Object.assign({}, state, {
        active: true
      });

    default: 
      return state;
  }
}