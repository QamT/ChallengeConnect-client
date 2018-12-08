import * as types from '../actions/actionType';

const initialState = {
  userId: null,
  firstName: '',
  lastName: '',
  profilePic: null,
  currentChallenge: null,
  challengeRequested: {
    id: null,
    title: null
  },
  friends: [],
  friendRequests: [],
  friendRequested: [],
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        userId: action.userInfo.id,
        firstName: action.userInfo.firstName,
        lastName: action.userInfo.lastName,
        profilePic: action.userInfo.profilePic,
        currentChallenge: action.userInfo.currentChallenge.id,
        challengeRequested: {
          id: action.userInfo.currentChallenge.challengeRequested.id
        },
        friends: [...action.userInfo.friends.list],
        friendRequests: [...action.userInfo.friends.friendRequests],
        friendRequested: [...action.userInfo.friends.friendRequested],
        loading: false
      });

    case types.USER_INFO_ERROR: 
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });

    case types.REQUEST_CHALLENGE_SUCCESS: 
      return Object.assign({}, state, {
        challengeRequested: {
          id: action.challenge
        }
      });

    case types.FETCH_CHALLENGE_INFO_SUCCESS:
      return Object.assign({}, state, {
        challengeRequested: {
          title: action.challenge.title
        }
      });

    case types.USER_REQUEST: 
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.ADD_CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        currentChallenge: action.challenge.id,
        challengeRequested: {
          id: null
        }
      });

    case types.RESET_USER_CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        currentChallenge: null
      });

    case types.SEND_FRIEND_REQUEST_SUCCESS: 
      return Object.assign({}, state, {
        friendRequested: [...action.requests]
      });

    case types.ACCEPT_FRIEND_REQUEST_SUCCESS: 
      return Object.assign({}, state, {
        friends: [...action.user.list],
        friendRequests: [...action.user.requests]
      });

    case types.REJECT_FRIEND_REQUEST_SUCCESS: 
      return Object.assign({}, state, {
        friendRequests: [...action.requests]
      });

    case types.REMOVE_FRIEND_SUCCESS: 
      return Object.assign({}, state, {
        friends: [...action.list]
      });

    default: 
      return state;
  }
}