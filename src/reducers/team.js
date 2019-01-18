import * as types from '../actions/actionType';

const initialState = {
  teamId: null,
  teamA: {
    members: [],
    proofs: [],
    score: 0
  },
  teamB: {
    members: [],
    proofs: [],
    score: 0
  },
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEAM_SUCCESS:
      return {...state,
        loading: false,
        teamId: action.teams.id,
        teamA: {
          members: [...action.teams.teamA.team],
          proofs: [...action.teams.teamA.proofs],
          score: action.teams.teamA.score
        },
        teamB: {
          members: [...action.teams.teamB.team],
          proofs: [...action.teams.teamB.proofs],
          score: action.teams.teamB.score
        },
      };

    case types.TEAM_ERROR:
      return {...state,
        loading: false,
        error: action.error
      };

    case types.TEAM_REQUEST:
      return {...state,
        loading: true, 
        error: null
      };

    case types.REFRESH_TEAM_INFO_SUCCESS:
      return {...state,
        teamA: {
          ...state.teamA,
          members: [...action.teams.teamA.team]
        },
        teamB: {
          ...state.teamB,
          members: [...action.teams.teamB.team]
        }
      };

    case types.REFRESH_SCORE_SUCCESS: 
      return {...state,
        teamA: {
          ...state.teamA,
          score: action.teams.teamA.score
        },
        teamB: {
          ...state.teamB,
          score: action.teams.teamB.score
        }
      };

    case types.REFRESH_PROOFS_SUCCESS:
      return {...state,
        teamA: {
          ...state.teamA,
          proofs: action.teams.teamA.proofs
        },
        teamB: {
          ...state.teamB,
          proofs: action.teams.teamB.proofs
        }
      };

    case types.ADD_MEMBER_A: 
      return {...state,
        teamA: {
          ...state.teamA,
          members: [...action.team]
        }
      };

    case types.ADD_MEMBER_B: 
      return {...state,
        teamB: {
          ...state.teamB,
          members: [...action.team]
        }
      };

    case types.DECREASE_SCORE_A:
      return {...state,
        teamA: {
          ...state.teamA,
          score: state.teamA.score - 1
        }
      };

    case types.DECREASE_SCORE_B:
      return {...state,
        teamB: {
          ...state.teamB,
          score: state.teamB.score - 1
        }
      };

    case types.UPLOAD_PROOF_SUCCESS:
      return {...state,
        teamA: {
          ...state.teamA,
          proofs: [...action.teams.teamA.proofs],
          score: action.teams.teamA.score
        },
        teamB: {
          ...state.teamB,
          proofs: [...action.teams.teamB.proofs],
          score: action.teams.teamB.score
        }
      };

    case types.CHALLENGE_PROOF_SUCCESS:
      return {...state,
        teamA: {
          ...state.teamA,
          proofs: [...action.teams.teamA.proofs]
        },
        teamB: {
          ...state.teamB,
          proofs: [...action.teams.teamB.proofs]
        }
    };

    case types.CLEAR_PROOF:
      return {...state,
        teamA: {
          ...state.teamA,
          proofs: state.teamA.proofs.map(proof =>
            proof._id === action.proof ? { ...proof, challenged: false, reason: '' } : proof
          )
        },
        teamB: {
          ...state.teamB,
          proofs: state.teamB.proofs.map(proof =>
            proof._id === action.proof ? { ...proof, challenged: false, reason: '' } : proof
          )
        }
    };

    case types.DELETE_PROOF:
      return {...state,
        teamA: {
          ...state.teamA,
          proofs: state.teamA.proofs.map(proof =>
            proof._id === action.proof ? { ...proof, challenged: false, reason: '', user: { id: null, name: '' }, url: '' } : proof
          )
        },
        teamB: {
          ...state.teamB,
          proofs: state.teamB.proofs.map(proof =>
            proof._id === action.proof ? { ...proof, challenged: false, reason: '', user: { id: null, name: '' }, url: '' } : proof
          )
        }
    };

    default: 
      return state;
  }
}