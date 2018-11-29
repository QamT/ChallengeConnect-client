import * as types from '../actions/actionType';

const initialState = {
  teams: {
    myTeam: {
      members: ['Katy', 'Miles', 'Antonio'],
      score: 2,
    },
    otherTeam: {
      members: ['decoy', 'decoy', 'decoy'],
      score: 4
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TEAM_SUCCESS:
      return Object.assign({}, state, {
        teams: state.teams
      });

    default: 
      return state;
  }
}