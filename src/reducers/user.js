import * as types from '../actions/actionType';

const initialState = {
<<<<<<< HEAD
  userId: null,
  firstName: '',
  lastName: '',
  profilePic: null,
  currentChallenge: null,
  friends: [],
  loading: true,
  error: null
=======
  user: {
    id: 123,
    currentChallengeId: 'challenge',
    admin: {
      isAdmin: true,
      usersRequest: null,
      rejectedUser: null,
      acceptedUser: null,
      proofChallenged: null,
      acceptedProof: null,
      rejectedProof: null
    },
    challengeRequest: {
      request: null,
      status: null
    },
    score: 0,
    proof: {
      uploaded: null,
      challenged: null
    }
  }
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
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
        friends: [...action.userInfo.friends.list]
      });

    case types.USER_INFO_ERROR: 
    return Object.assign({}, state, {
      loading: false,
      error: action.error
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