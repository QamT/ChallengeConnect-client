import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import reducer from './reducers';
import { loadAuthToken } from './local-storage';
import { setAuthToken, authSuccess } from './actions/auth';

const store = createStore(reducer, applyMiddleware(thunk));

const authToken = loadAuthToken();
if (authToken) {
  store.dispatch(setAuthToken(authToken));
  store.dispatch(authSuccess(jwtDecode(authToken).user))
}

export default store;