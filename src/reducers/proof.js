import * as types from '../actions/actionType';

const initialState = {
  proofA: [],
  proofB: [],
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PROOF_SUCCESSA: 
      return Object.assign({}, state, {
        loading: false,
        proofA: (() => {
          return state.proofA.length < 5 ? [...state.proofA, action.proof] : [...state.proofA]
        })()
      });

    case types.PROOF_SUCCESSB: 
      return Object.assign({}, state, {
        loading: false,
        proofB: (() => {
          return state.proofB.length < 5 ? [...state.proofB, action.proof] : [...state.proofB]
        })()
      });

    case types.PROOF_ERROR: 
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    case types.PROOF_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    default: 
      return state
  }
}