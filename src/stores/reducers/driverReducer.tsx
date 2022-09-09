import DriverActionTypes from 'stores/actions/driver/driverTypes';
import { DriverActions, DriverState } from 'stores/types/driverType';

const initialState: DriverState = {
  fetchingDriver: false,
  fetchedDriver: false,
  drivers: [],
  driver: null,
  error: null,
};

const driverReducer = (
  action: DriverActions,
  state: DriverState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case DriverActionTypes.GET_DRIVER_REQUEST:
      return {
        ...state,
        fetchingDriver: true,
        fetchedDriver: false,
        drivers: [],
        error: null,
      };
    case DriverActionTypes.GET_DRIVER_SUCCESS:
      return {
        ...state,
        fetchingDriver: false,
        fetchedDriver: true,
        drivers: action.payload,
        error: null,
      };
    case DriverActionTypes.GET_DRIVER_FAILURE:
      return {
        ...state,
        fetchingDriver: false,
        drivers: [],
        error: action.payload,
      };
    case DriverActionTypes.POST_DRIVER_REQUEST:
      return {
        ...state,
        driver: null,
        error: null,
      };
    case DriverActionTypes.POST_DRIVER_SUCCESS:
      return {
        ...state,
        driver: action.payload,
        error: null,
      };
    case DriverActionTypes.POST_DRIVER_FAILURE:
      return {
        ...state,
        driver: null,
        error: action.payload,
      };
    case DriverActionTypes.PUT_DRIVER_REQUEST:
      return {
        ...state,
        driver: null,
        error: null,
      };
    case DriverActionTypes.PUT_DRIVER_SUCCESS:
      return {
        ...state,
        driver: action.payload,
        error: null,
      };
    case DriverActionTypes.PUT_DRIVER_FAILURE:
      return {
        ...state,
        driver: null,
        error: action.payload,
      };
    case DriverActionTypes.DELETE_DRIVER_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DriverActionTypes.DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case DriverActionTypes.DELETE_DRIVER_FAILURE:
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

export default driverReducer;
