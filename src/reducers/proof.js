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

    case types.UPLOAD_PROOF_SUCCESS:
      return Object.assign({}, state, {
        proofA: state.proofA.map(proof => proof.id === action.proof.id ? action.proof : proof),
        proofB: state.proofB.map(proof => proof.id === action.proof.id ? action.proof : proof)
      });

    case types.CHALLENGE_PROOF_SUCCESS:
      return Object.assign({}, state, {
        proofA: state.proofA.map(proof => 
          proof.id === action.proof.id ? {...proof, challenged: true, reason: action.proof.reason} : proof),
        proofB: state.proofB.map(proof => 
          proof.id === action.proof.id ? {...proof, challenged: true, reason: action.proof.reason} : proof)
      });

    case types.CLEAR_PROOF:
      return Object.assign({}, state, {
        proofA: state.proofA.map(proof => 
          proof.id === action.proof.id ? {...proof, challenged: false, reason: ''} : proof),
        proofB: state.proofB.map(proof => 
          proof.id === action.proof.id ? {...proof, challenged: false, reason: ''} : proof)
      });

    case types.DELETE_PROOF:
      return Object.assign({}, state, {
        proofA: state.proofA.map(proof => 
          proof.id === action.proof.id ? {...proof, challenged: false, reason: '', user: null, url: ''} : proof),
        proofB: state.proofB.map(proof => 
          proof.id === action.proof.id ? {...proof, challenged: false, reason: '', user: null, url: ''} : proof)
      });

    default: 
      return state
  }
}