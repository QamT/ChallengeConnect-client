import * as types from '../actions/actionType';

const initialState = {
  authToken: null,
  currentUser: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUTH_TOKEN: 
      return { ...state, authToken: action.authToken };

    case types.CLEAR_AUTH: 
      return { ...state, authToken: null, currentUser: null };

    case types.AUTH_REQUEST: 
      return { ...state, loading: true, error: null };

    case types.AUTH_SUCCESS: 
      return { ...state, loading: false, currentUser: action.currentUser.id };

    case types.AUTH_ERROR: 
      return { ...state, loading: false, error: action.error };

    case types.CLEAR_AUTH_ERROR: 
      return { ...state, error: null };
      
    default: 
      return state
  }
}