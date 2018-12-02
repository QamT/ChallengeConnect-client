import * as types from '../actions/actionType';

const initialState = {
<<<<<<< HEAD
  teamId: null,
  teamA: {
    members: [],
    proofs: []
  },
  teamB: {
    members: [],
    proofs: []
  },
  loading: true,
  error: null
=======
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
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEAM_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        teamId: action.teamData.id,
        teamA: {
          members: [...action.teamData.teamA.team],
          proof: [...action.teamData.teamA.proofs]
        },
        teamB: {
          members: [...action.teamData.teamB.team],
          proof: [...action.teamData.teamB.proofs]
        },
      });
    case types.TEAM_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    case types.TEAM_REQUEST:
      return Object.assign({}, state, {
        loading: true, 
        error: null
      });
    default: 
      return state;
  }
}