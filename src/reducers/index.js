import { combineReducers } from 'redux';

import authReducer from './auth';
import challengeReducer from './challenge';
import teamReducer from './team';
import userReducer from './user';
import adminReducer from './admin';
import globalReducer from './global';

const rootReducer = combineReducers({
  auth: authReducer,
  challenge: challengeReducer,
  team: teamReducer,
  user: userReducer,
  admin: adminReducer,
  global: globalReducer
});

export default rootReducer;