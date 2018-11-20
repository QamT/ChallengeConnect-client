import * as types from '../actions/actionType';

const initialState = {
  currentChallenge: {
    challenges: ['feed a homeless person', 'read a book', 'do a 100 pushups'],
    active: true,
    complete: false,
    proofs: [
      {
        id: 4,
        proof: '!',
        uploaded: true,
        challenged: false
      },
      {
        id: 32,
        proof: '!',
        uploaded: true,
        challenged: true
      },
      {
        id: 543,
        proof: null,
        uploaded: false,
        challenged: false
      },
      {
        id: 4345,
        proof: '!',
        uploaded: true,
        challenged: false
      },
      {
        id: 3265,
        proof: '!',
        uploaded: true,
        challenged: true
      },
      {
        id: 54377,
        proof: null,
        uploaded: false,
        challenged: false
      },
    ]
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        currentChallenge: state.currentChallenge
      });

    default: 
      return state;
  }
}