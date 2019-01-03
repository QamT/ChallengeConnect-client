import * as types from '../actions/actionType';

const initialState = {
  teamId: null,
  teamA: {
    members: [],
    proof: [],
    score: 0
  },
  teamB: {
    members: [],
    proof: [],
    score: 0
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
          proof: [...action.teamData.teamA.proofs],
          score: action.teamData.teamA.score
        },
        teamB: {
          members: [...action.teamData.teamB.team],
          proof: [...action.teamData.teamB.proofs],
          score: action.teamData.teamB.score
        },
      });

    case types.REFRESH_TEAM_A_INFO_SUCCESS:
      return Object.assign({}, state, {
        teamA: {
          ...state.teamA,
          members: [...action.teamA.team]
        }
      });

    case types.REFRESH_TEAM_B_INFO_SUCCESS:
      return Object.assign({}, state, {
        teamB: {
          ...state.teamB,
          members: [...action.teamB.team]
        }
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
            ...state.teamA,
            members: [...state.teamA.members, action.user]
          }
        });

      case types.ADD_MEMBER_B: 
        return Object.assign({}, state, {
          teamB: {
            ...state.teamB,
            members: [...state.teamB.members, action.user]
          }
        });

      case types.ADD_SCORE_A:
        return Object.assign({}, state, {
          teamA: {
            ...state.teamA,
            score: state.teamA.score + 1
          }
        });

      case types.ADD_SCORE_B:
        return Object.assign({}, state, {
          teamB: {
            ...state.teamB,
            score: state.teamB.score + 1
          }
        });

      case types.DECREASE_SCORE_A:
        return Object.assign({}, state, {
          teamA: {
            ...state.teamA,
            score: state.teamA.score - 1
          }
        });

      case types.DECREASE_SCORE_B:
        return Object.assign({}, state, {
          teamB: {
            ...state.teamB,
            score: state.teamB.score - 1
          }
        });

      case types.REFRESH_SCORE_SUCCESS: 
        return Object.assign({}, state, {
          teamA: {
            ...state.teamA,
            score: action.teams.teamA.score
          },
          teamB: {
            ...state.teamB,
            score: action.teams.teamB.score
          }
        });

    default: 
      return state;
  }
}