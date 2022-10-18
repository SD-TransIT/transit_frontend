import ShipmentImagesActionTypes from 'stores/actions/shipmentImages/shipmentImagesTypes';
import { ShipmentImagesActions, ShipmentImagesState } from 'stores/types/shipmentImagesType';

const initialState: ShipmentImagesState = {
  fetchingShipmentImages: false,
  fetchedShipmentImages: false,
  shipmentImages: [],
  error: null,
};

const shipmentImagesReducer = (
  action: ShipmentImagesActions,
  state: ShipmentImagesState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_REQUEST:
      return {
        ...state,
        fetchingShipmentImages: true,
        fetchedShipmentImages: false,
        shipmentImages: [],
        error: null,
      };
    case ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_SUCCESS:
      return {
        ...state,
        fetchingShipmentImages: false,
        fetchedShipmentImages: true,
        shipmentImages: action.payload,
        error: null,
      };
    case ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_FAILURE:
      return {
        ...state,
        fetchingShipmentImages: false,
        shipmentImages: [],
        error: action.payload,
      };
    case ShipmentImagesActionTypes.RESET_SHIPMENT_IMAGES:
      return initialState;
    default:
      return {
        ...state,
      };
  }
};

export default shipmentImagesReducer;
