import * as types from '../actions/actionType';

const initialState = {
  leaders: [
    {
      id: 12,
      name: 'John',
      score: 50
    },
    {
      id: 123,
      name: 'Kelly',
      score: 40
    },
    {
      id: 1234,
      name: 'Kevin',
      score: 30
    }
  ],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LEADERBOARD_SUCCESS:
      return Object.assign({}, state, {
        leaders: [...state.leaders]
      });

    case types.FETCH_LEADERBOARD_SUCCESS:
      return Object.assign({}, state, {
        error: action.error
      });

    default: 
      return state;
  }
}