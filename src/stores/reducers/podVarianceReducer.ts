import PodVarianceActionTypes from 'stores/actions/podVariance/podVarianceTypes';
import { PodVarianceActions, PodVarianceState } from 'stores/types/podVarianceType';

const initialState: PodVarianceState = {
  fetchingPodVariance: false,
  fetchedPodVariance: false,
  podVariances: [],
  podVariance: null,
  error: null,
};

const podVarianceReducer = (
  action: PodVarianceActions,
  state: PodVarianceState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case PodVarianceActionTypes.GET_POD_VARIANCE_REQUEST:
      return {
        ...state,
        fetchingPodVariance: true,
        fetchedPodVariance: false,
        podVariances: [],
        error: null,
      };
    case PodVarianceActionTypes.GET_POD_VARIANCE_SUCCESS:
      return {
        ...state,
        fetchingPodVariance: false,
        fetchedPodVariance: true,
        podVariances: action.payload,
        error: null,
      };
    case PodVarianceActionTypes.GET_POD_VARIANCE_FAILURE:
      return {
        ...state,
        fetchingPodVariance: false,
        podVariances: [],
        error: action.payload,
      };
    case PodVarianceActionTypes.POST_POD_VARIANCE_REQUEST:
      return {
        ...state,
        podVariance: null,
        error: null,
      };
    case PodVarianceActionTypes.POST_POD_VARIANCE_SUCCESS:
      return {
        ...state,
        podVariance: action.payload,
        error: null,
      };
    case PodVarianceActionTypes.POST_POD_VARIANCE_FAILURE:
      return {
        ...state,
        podVariance: null,
        error: action.payload,
      };
    case PodVarianceActionTypes.PUT_POD_VARIANCE_REQUEST:
      return {
        ...state,
        podVariance: null,
        error: null,
      };
    case PodVarianceActionTypes.PUT_POD_VARIANCE_SUCCESS:
      return {
        ...state,
        podVariance: action.payload,
        error: null,
      };
    case PodVarianceActionTypes.PUT_POD_VARIANCE_FAILURE:
      return {
        ...state,
        podVariance: null,
        error: action.payload,
      };
    case PodVarianceActionTypes.DELETE_POD_VARIANCE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case PodVarianceActionTypes.DELETE_POD_VARIANCE_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case PodVarianceActionTypes.DELETE_POD_VARIANCE_FAILURE:
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

export default podVarianceReducer;
