import { TokenActionTypes } from '../actions/token/tokenActionTypes';
import { TokenActions, TokenState } from '../types/type';

const initialState: TokenState = {
  fetchingToken: false,
  fetchedToken: false,
  token: null,
  error: null,
};

const tokenReducer = (action: TokenActions, state: TokenState = initialState) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case TokenActionTypes.FETCH_TOKEN_REQUEST:
      return {
        ...state,
        fetchingToken: true,
        fetchedToken: false,
        token: null,
        error: null,
      };
    case TokenActionTypes.FETCH_TOKEN_SUCCESS:  
      return {
        ...state,
        fetchingToken: false,
        fetchedToken: true,
        token: action.payload,
        error: null,
      };
    case TokenActionTypes.FETCH_TOKEN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        fetchingToken: false,
        token: null,
        error: action.payload,
      };
    case TokenActionTypes.REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        fetchingToken: true,
        fetchedToken: false,
        token: null,
        error: null,
      };
    case TokenActionTypes.REFRESH_TOKEN_SUCCESS:  
      return {
        ...state,
        fetchingToken: false,
        fetchedToken: true,
        token: action.payload,
        error: null,
      };
    case TokenActionTypes.REFRESH_TOKEN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        fetchingToken: false,
        token: null,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default tokenReducer;
