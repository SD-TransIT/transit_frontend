import ModeOfTransportActionTypes from '../actions/modeOfTransport/modeOfTransportTypes';
import { ModeOfTransportActions, ModeOfTransportState } from '../types/modeOfTransportType';

const initialState: ModeOfTransportState = {
  fetchingModeOfTransport: false,
  fetchedModeOfTransport: false,
  modes: [],
  mode: null,
  error: null,
};

const modeOfTransportReducer = (
  action: ModeOfTransportActions,
  state: ModeOfTransportState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_REQUEST:
      return {
        ...state,
        fetchingModeOfTransport: true,
        fetchedModeOfTransport: false,
        modes: [],
        error: null,
      };
    case ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_SUCCESS:
      return {
        ...state,
        fetchingModeOfTransport: false,
        fetchedModeOfTransport: true,
        modes: action.payload,
        error: null,
      };
    case ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_FAILURE:
      return {
        ...state,
        fetchingModeOfTransport: false,
        modes: [],
        error: action.payload,
      };
    case ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_REQUEST:
      return {
        ...state,
        mode: null,
        error: null,
      };
    case ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_SUCCESS:
      return {
        ...state,
        mode: action.payload,
        error: null,
      };
    case ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_FAILURE:
      return {
        ...state,
        mode: null,
        error: action.payload,
      };
    case ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_REQUEST:
      return {
        ...state,
        mode: null,
        error: null,
      };
    case ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_SUCCESS:
      return {
        ...state,
        mode: action.payload,
        error: null,
      };
    case ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_FAILURE:
      return {
        ...state,
        mode: null,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default modeOfTransportReducer;
