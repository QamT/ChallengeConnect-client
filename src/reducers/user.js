import * as types from '../actions/actionType';

const initialState = {
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
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        user: state.user
      });

    default: 
      return state;
  }
}