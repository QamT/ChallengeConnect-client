import * as types from '../actions/actionType';

const initialState = {
  challenges: [],
  challengeList: [
    'Feed a homeless person',
    'Do a 100 push ups',
    'Read a book',
    'Make spaghetti',
    'Donate blood',
    'Volunteer at an organization',
    'Write a blog post',
    'Hot pepper challenge',
    'Ice bucket challenge',
    'Get a victory royale win',
    'Plant a tree',
    'Go skydiving',
    'Learn an instrument',
    'Solve a rubik\'s cube',
    'Get a celebrity\'s autograph'
  ],
  teams: [], 
  loading: true,
  leaders: [],
  boardLoading: true,
  searchLoading: false,
  searchUsers: [],
  globalError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_CHALLENGES_SUCCESS: 
      return {...state, 
        loading: false,
        challenges: [...action.challenges.challenges],
        teams: [...action.challenges.teams]
      };

    case types.ALL_CHALLENGES_ERROR: 
      return {...state,
        loading: false,
        globalError: action.error
      };

    case types.ALL_CHALLENGES_REQUEST: 
      return {...state,
        loading: true,
        globalError: null
      };

    case types.LEADERBOARD_SUCCESS: 
      return {...state,
        boardLoading: false,
        leaders: [...action.leaderboard]
      };

    case types.LEADERBOARD_ERROR: 
      return {...state,
        boardLoading: false,
        globalError: action.error
      };

    case types.LEADERBOARD_REQUEST: 
      return {...state,
        boardLoading: true,
        globalError: null
      };

    case types.SEARCH_USER_REQUEST: 
      return { ...state, searchLoading: true };

    case types.SEARCH_USER_SUCCESS: 
      return {...state,
        searchLoading: false,
        searchUsers: [...action.users]
      };

    case types.SEARCH_USER_ERROR:
      return { ...state, globalError: action.error }

    case types.CLEAR_RESULTS: 
      return { ...state, searchUsers: [] };
    
    default: 
      return state;
  }
}