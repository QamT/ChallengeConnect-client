import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import leaderboardReducer from './leaderboard';
import challengeReducer from './challenge';
import teamReducer from './team';
import userReducer from './user';
import proofReducer from './proof';
import globalReducer from './global';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  leaderboard: leaderboardReducer,
  challenge: challengeReducer,
  team: teamReducer,
  user: userReducer,
  proof: proofReducer,
  global: globalReducer
});

export default rootReducer;