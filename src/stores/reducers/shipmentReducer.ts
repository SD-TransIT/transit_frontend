import ShipmentActionTypes from 'stores/actions/shipment/shipmentTypes';
import { ShipmentActions, ShipmentState } from 'stores/types/shipmentType';

const initialState: ShipmentState = {
  fetchingShipment: false,
  fetchedShipment: false,
  shipments: [],
  shipment: null,
  error: null,
};

const shipmentReducer = (
  action: ShipmentActions,
  state: ShipmentState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case ShipmentActionTypes.GET_SHIPMENT_REQUEST:
      return {
        ...state,
        fetchingShipment: true,
        fetchedShipment: false,
        shipments: [],
        error: null,
      };
    case ShipmentActionTypes.GET_SHIPMENT_SUCCESS:
      return {
        ...state,
        fetchingShipment: false,
        fetchedShipment: true,
        shipments: action.payload,
        error: null,
      };
    case ShipmentActionTypes.GET_SHIPMENT_FAILURE:
      return {
        ...state,
        fetchingShipment: false,
        shipments: [],
        error: action.payload,
      };
    case ShipmentActionTypes.POST_SHIPMENT_REQUEST:
      return {
        ...state,
        shipment: null,
        error: null,
      };
    case ShipmentActionTypes.POST_SHIPMENT_SUCCESS:
      window.localStorage.setItem('stateType', ('POST_SHIPMENT_SUCCESS'));

      return {
        ...state,
        shipment: action.payload,
        error: null,
      };
    case ShipmentActionTypes.POST_SHIPMENT_FAILURE:
      window.localStorage.setItem('stateType', ('POST_SHIPMENT_FAILURE'));

      return {
        ...state,
        shipment: null,
        error: action.payload,
      };
    case ShipmentActionTypes.PUT_SHIPMENT_REQUEST:
      return {
        ...state,
        shipment: null,
        error: null,
      };
    case ShipmentActionTypes.PUT_SHIPMENT_SUCCESS:
      window.localStorage.setItem('stateType', ('PUT_SHIPMENT_SUCCESS'));

      return {
        ...state,
        shipment: action.payload,
        error: null,
      };
    case ShipmentActionTypes.PUT_SHIPMENT_FAILURE:
      window.localStorage.setItem('stateType', ('PUT_SHIPMENT_FAILURE'));

      return {
        ...state,
        shipment: null,
        error: action.payload,
      };
    case ShipmentActionTypes.DELETE_SHIPMENT_REQUEST:
      return {
        ...state,
        error: null,
      };
    case ShipmentActionTypes.DELETE_SHIPMENT_SUCCESS:
      window.localStorage.setItem('stateType', ('DELETE_SHIPMENT_SUCCESS'));

      return {
        ...state,
        error: null,
      };
    case ShipmentActionTypes.DELETE_SHIPMENT_FAILURE:
      window.localStorage.setItem('stateType', ('DELETE_SHIPMENT_FAILURE'));

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

export default shipmentReducer;
