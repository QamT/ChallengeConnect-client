import { combineReducers } from 'redux';

import leaderboardReducer from './leaderboard';
import challengeReducer from './challenge';
import teamReducer from './team';
import userReducer from './user';

const rootReducer = combineReducers({
  leaderboard: leaderboardReducer,
  challenge: challengeReducer,
  team: teamReducer,
  user: userReducer
});

export default rootReducer;