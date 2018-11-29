import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import leaderboardReducer from './leaderboard';
import challengeReducer from './challenge';
import teamReducer from './team';
import userReducer from './user';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  leaderboard: leaderboardReducer,
  challenge: challengeReducer,
  team: teamReducer,
  user: userReducer
});

export default rootReducer;