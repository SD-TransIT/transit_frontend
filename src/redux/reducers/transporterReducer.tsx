import TransporterActionTypes from '../actions/transporter/transporterTypes';
import { TransporterActions, TransporterState } from '../types/transporterType';

const initialState: TransporterState = {
  fetchingTransporter: false,
  fetchedTransporter: false,
  transporters: [],
  transporter: null,
  error: null,
};

const transporterReducer = (
  action: TransporterActions,
  state: TransporterState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case TransporterActionTypes.GET_TRANSPORTER_REQUEST:
      return {
        ...state,
        fetchingTransporter: true,
        fetchedTransporter: false,
        transporters: [],
        error: null,
      };
    case TransporterActionTypes.GET_TRANSPORTER_SUCCESS:
      return {
        ...state,
        fetchingTransporter: false,
        fetchedTransporter: true,
        transporters: action.payload,
        error: null,
      };
    case TransporterActionTypes.GET_TRANSPORTER_FAILURE:
      return {
        ...state,
        fetchingTransporter: false,
        transporters: [],
        error: action.payload,
      };
    case TransporterActionTypes.POST_TRANSPORTER_REQUEST:
      return {
        ...state,
        transporter: null,
        error: null,
      };
    case TransporterActionTypes.POST_TRANSPORTER_SUCCESS:
      return {
        ...state,
        transporter: action.payload,
        error: null,
      };
    case TransporterActionTypes.POST_TRANSPORTER_FAILURE:
      return {
        ...state,
        transporter: null,
        error: action.payload,
      };
    case TransporterActionTypes.PUT_TRANSPORTER_REQUEST:
      return {
        ...state,
        transporter: null,
        error: null,
      };
    case TransporterActionTypes.PUT_TRANSPORTER_SUCCESS:
      return {
        ...state,
        transporter: action.payload,
        error: null,
      };
    case TransporterActionTypes.PUT_TRANSPORTER_FAILURE:
      return {
        ...state,
        transporter: null,
        error: action.payload,
      };
    case TransporterActionTypes.DELETE_TRANSPORTER_REQUEST:
      return {
        ...state,
        error: null,
      };
    case TransporterActionTypes.DELETE_TRANSPORTER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case TransporterActionTypes.DELETE_TRANSPORTER_FAILURE:
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

export default transporterReducer;
