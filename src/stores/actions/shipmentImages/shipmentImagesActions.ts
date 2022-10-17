import {
  GetShipmentImagesError,
  GetShipmentImagesErrorPayload,
  GetShipmentImagesRequest,
  GetShipmentImagesRequestPayload,
  GetShipmentImagesSuccess,
  GetShipmentImagesSuccessPayload,
  ResetShipmentImages,
} from 'stores/types/shipmentImagesType';

import ShipmentImagesActionTypes from './shipmentImagesTypes';

export const getShipmentImagesRequest = (
  payload: GetShipmentImagesRequestPayload,
): GetShipmentImagesRequest => ({
  type: ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_REQUEST,
  payload,
});

export const getShipmentImagesSuccess = (
  payload: GetShipmentImagesSuccessPayload,
): GetShipmentImagesSuccess => ({
  type: ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_SUCCESS,
  payload,
});

export const getShipmentImagesFailure = (
  payload: GetShipmentImagesErrorPayload,
): GetShipmentImagesError => ({
  type: ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_FAILURE,
  payload,
});

export const resetShipmentImages = (): ResetShipmentImages => ({
  type: ShipmentImagesActionTypes.RESET_SHIPMENT_IMAGES,
});
