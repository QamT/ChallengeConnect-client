import * as types from '../actions/actionType';

const initialState = {
  userId: null,
  firstName: '',
  lastName: '',
  profilePic: {},
  currentChallenge: null,
  challengeRequested: [],
  challengeRequests: [],
  friends: [],
  friendRequests: [],
  friendRequested: [],
  challengeSent: [],
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_INFO_SUCCESS:
      return {...state,
        userId: action.user.id,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        profilePic: action.user.profilePic,
        currentChallenge: action.user.currentChallenge.id,
        challengeRequested: [...action.user.challengeRequested],
        challengeRequests: [...action.user.challengeRequests],
        friends: [...action.user.friends.list],
        friendRequests: [...action.user.friends.friendRequests],
        friendRequested: [...action.user.friends.friendRequested],
        challengeSent: [...action.user.friends.challengeSent],
        loading: false
      };

    case types.USER_INFO_ERROR: 
      return {...state,
        loading: false,
        error: action.error
      };

    case types.USER_REQUEST: 
      return {...state,
        loading: true,
        error: null
      };

    case types.REFRESH_USER_CHALLENGE_SUCCESS: 
      return { ...state, currentChallenge: action.challenge };

    case types.REQUEST_CHALLENGE: 
      return { ...state, challengeRequested: [...action.challenge] };

    case types.ADD_CHALLENGE_SUCCESS:
      return {...state,
        currentChallenge: action.challenge.id,
        challengeRequested: [],
        challengeRequests: []
      };

    case types.SEND_CHALLENGE_SUCCESS:
      return { ...state, challengeSent: [...action.requested] };

    case types.ACCEPT_CHALLENGE_SUCCESS:
      return { ...state, currentChallenge: action.challenge };

    case types.REJECT_CHALLENGE_SUCCESS:
      return { ...state, challengeRequests: [...action.requests] }

    case types.RESET_USER_CHALLENGE_SUCCESS:
      return { ...state, currentChallenge: null };

    case types.SEND_FRIEND_REQUEST_SUCCESS: 
      return { ...state, friendRequested: [...action.requested] };

    case types.ACCEPT_FRIEND_REQUEST_SUCCESS: 
      return {...state,
        friends: [...action.user.list],
        friendRequests: [...action.user.requests]
      };

    case types.REJECT_FRIEND_REQUEST_SUCCESS: 
      return { ...state, friendRequests: [...action.requests] };

    case types.REMOVE_FRIEND_SUCCESS: 
      return { ...state, friends: [...action.list] };

    case types.REFRESH_FRIEND_INFO_SUCCESS:
      return {...state, 
        friends: [...action.info.friends.list],
        friendRequests: [...action.info.friends.friendRequests],
        friendRequested: [...action.info.friends.friendRequested]
      }

    case types.REFRESH_CHALLENGE_REQUEST_SUCCESS:
      return { ...state, challengeRequests: [...action.requests] }

    default: 
      return state;
  }
}