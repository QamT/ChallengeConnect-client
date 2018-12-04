import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import { loadAuthToken } from './local-storage';
import { setAuthToken } from './actions/auth';

const store = createStore(reducer, applyMiddleware(thunk));

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
}

export default store;