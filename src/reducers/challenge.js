import * as types from '../actions/actionType';

const initialState = {
<<<<<<< HEAD
  challengeId: null,
  adminId: null,
  title: '',
  challenges: [],
  teamId: null,
  active: false,
  completed: false,
  loading: true,
  error: null
=======
  currentChallenge: {
    id: 12345,
    challenges: ['feed a homeless person', 'read a book', 'do a 100 pushups'],
    active: false,
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
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        challengeId: action.challenge.id,
        adminId: action.challenge.admin,
        title: action.challenge.title,
        challenges: [...action.challenge.challenges],
        teamId: action.challenge.teams,
        active: action.challenge.active,
        completed: action.challenge.completed
      });
    case types.CHALLENGE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    case types.CHALLENGE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    default: 
      return state;
  }
}