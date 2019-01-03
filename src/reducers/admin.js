import * as types from '../actions/actionType';

const initialState = {
  admin: null,
  userRequests: [],
  proofChallenged: [],
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {

    case types.ADMIN_SUCCESS: 
      return Object.assign({}, state, {
        admin: action.admin.user,
        userRequests: [...action.admin.usersRequest],
        proofChallenged: [...action.admin.proofChallenged]
      });

    case types.ADMIN_ERROR: 
      return Object.assign({}, state, {
        error: action.error.message,
        userRequests: [...action.error.admin.usersRequest]
      });

    case types.CLEAR_ERROR: 
      return Object.assign({}, state, {
        error: null
      });

    case types.ACCEPT_USER_SUCCESS: 
      return Object.assign({}, state, {
        userRequests: [...action.admin.usersRequest]
      });

    case types.REJECT_USER_SUCCESS: 
      return Object.assign({}, state, {
        userRequests: [...action.admin.usersRequest]
      });

    case types.ACCEPT_CHALLENGE_PROOF_SUCCESS:
      return Object.assign({}, state, {
        proofChallenged: [...action.admin.proofChallenged]
      });

    case types.DENY_CHALLENGE_PROOF_SUCCESS:
      return Object.assign({}, state, {
        proofChallenged: [...action.admin.proofChallenged]
      });

    default: 
      return state
  }
}