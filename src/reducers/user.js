import * as types from '../actions/actionType';

const initialState = {
  userId: null,
  firstName: '',
  lastName: '',
  profilePic: null,
  currentChallenge: null,
  challengeRequested: null,
  friends: [],
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userId: action.userInfo.id,
        firstName: action.userInfo.firstName,
        lastName: action.userInfo.lastName,
        profilePic: action.userInfo.profilePic,
        currentChallenge: action.userInfo.currentChallenge.id,
        challengeRequested: action.userInfo.currentChallenge.challengeRequested.id,
        friends: [...action.userInfo.friends.list]
      });

    case types.USER_INFO_ERROR: 
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });

    case types.REQUEST_CHALLENGE_SUCCESS: 
      console.log(action)
      return Object.assign({}, state, {
        challengeRequested: action.challenge
      });

    case types.USER_REQUEST: 
      return Object.assign({}, state, {
        loading: true,
        error: null
      })

    default: 
      return state;
  }
}