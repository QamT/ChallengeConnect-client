import * as types from '../actions/actionType';

const initialState = {
  challengeId: null,
  adminId: null,
  title: null,
  challenges: [],
  teamId: null,
  active: false,
  completedTime: null,
  winner: null,
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHALLENGE_SUCCESS:
      return {...state,
        loading: false,
        challengeId: action.challenge.id,
        adminId: action.challenge.admin,
        title: action.challenge.title,
        challenges: [...action.challenge.challenges],
        teamId: action.challenge.teams,
        active: action.challenge.active,
        completedTime: action.challenge.completedTime,
        winner: action.challenge.winner
      };

    case types.CHALLENGE_ERROR:
      return {...state,
        loading: false,
        error: action.error
      };

    case types.CHALLENGE_REQUEST:
      return {...state,
        loading: true,
        error: null
      };

    case types.ACTIVATE_CHALLENGE_SUCCESS: 
      return { ...state, active: action.challenge.active };

    case types.COMPLETE_CHALLENGE_SUCCESS: 
      return { ...state, winner: action.challenge.winner };

    case types.UPDATE_ACTIVE_STATUS:
      return { ...state, active: true };

    case types.UPDATE_COMPLETE_STATUS:
      return { ...state, winner: action.challenge.winner };

    case types.START_CHALLENGE_TIMER_SUCCESS:
      return { ...state, completedTime: action.time };

    case types.END_CHALLENGE_TIMER_SUCCESS:
      return { ...state, completedTime: null };

    default: 
      return state;
  }
}