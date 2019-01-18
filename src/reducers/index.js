import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import challengeReducer from './challenge';
import teamReducer from './team';
import userReducer from './user';
import adminReducer from './admin';
import globalReducer from './global';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  challenge: challengeReducer,
  team: teamReducer,
  user: userReducer,
  admin: adminReducer,
  global: globalReducer
});

export default rootReducer;