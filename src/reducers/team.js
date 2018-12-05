import * as types from '../actions/actionType';

const initialState = {
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

      case types.ADD_MEMBER_A: 
        return Object.assign({}, state, {
          teamA: {
            members: [...state.teamA.members, action.user]
          }
        });

      case types.ADD_MEMBER_B: 
        return Object.assign({}, state, {
          teamB: {
            members: [...state.teamB.members, action.user]
          }
        });

    default: 
      return state;
  }
}