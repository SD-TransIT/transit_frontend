import CostActionTypes from 'stores/actions/cost/costTypes';
import { CostActions, CostState } from 'stores/types/costType';

const initialState: CostState = {
  fetchingCost: false,
  fetchedCost: false,
  costs: [],
  cost: null,
  error: null,
};

const costReducer = (
  action: CostActions,
  state: CostState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case CostActionTypes.GET_COST_REQUEST:
      return {
        ...state,
        fetchingCost: true,
        fetchedCost: false,
        costs: [],
        error: null,
      };
    case CostActionTypes.GET_COST_SUCCESS:
      return {
        ...state,
        fetchingCost: false,
        fetchedCost: true,
        costs: action.payload,
        error: null,
      };
    case CostActionTypes.GET_COST_FAILURE:
      return {
        ...state,
        fetchingCost: false,
        costs: [],
        error: action.payload,
      };
    case CostActionTypes.POST_COST_REQUEST:
      return {
        ...state,
        cost: null,
        error: null,
      };
    case CostActionTypes.POST_COST_SUCCESS:
      return {
        ...state,
        cost: action.payload,
        error: null,
      };
    case CostActionTypes.POST_COST_FAILURE:
      return {
        ...state,
        cost: null,
        error: action.payload,
      };
    case CostActionTypes.PUT_COST_REQUEST:
      return {
        ...state,
        cost: null,
        error: null,
      };
    case CostActionTypes.PUT_COST_SUCCESS:
      return {
        ...state,
        cost: action.payload,
        error: null,
      };
    case CostActionTypes.PUT_COST_FAILURE:
      return {
        ...state,
        cost: null,
        error: action.payload,
      };
    case CostActionTypes.DELETE_COST_REQUEST:
      return {
        ...state,
        error: null,
      };
    case CostActionTypes.DELETE_COST_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case CostActionTypes.DELETE_COST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default costReducer;
