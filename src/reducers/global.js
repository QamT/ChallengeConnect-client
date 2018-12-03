import * as types from '../actions/actionType';

const initialState = {
  challenges: [],
  teams: [], 
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_CHALLENGES_SUCCESS: 
      return Object.assign({}, state, {
        loading: false,
        challenges: [...action.challenges.challenges],
        teams: [...action.challenges.teams]
      });
    case types.ALL_CHALLENGES_ERROR: 
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    case types.ALL_CHALLENGES_REQUEST: 
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    
    default: 
      return state;
  }
}