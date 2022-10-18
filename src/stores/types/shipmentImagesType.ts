import { IShipmentImages } from 'models/shipment/IShipmentImages';
import ShipmentImagesActionTypes from 'stores/actions/shipmentImages/shipmentImagesTypes';

export interface ShipmentImagesState {
  fetchingShipmentImages: boolean;
  fetchedShipmentImages: boolean;
  shipmentImages: IShipmentImages [] | [];
  error: string | null;
}

export interface GetShipmentImagesRequestPayload {
  payload: any;
}

export interface GetShipmentImagesSuccessPayload {
  shipmentImages: [IShipmentImages];
}

export interface GetShipmentImagesErrorPayload {
  error: string;
}

export interface GetShipmentImagesRequest {
  type: typeof ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_REQUEST;
  payload: GetShipmentImagesRequestPayload;
}

export type GetShipmentImagesSuccess = {
  type: typeof ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_SUCCESS;
  payload: GetShipmentImagesSuccessPayload;
};

export type GetShipmentImagesError = {
  type: typeof ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_FAILURE;
  payload: GetShipmentImagesErrorPayload;
};

export type ResetShipmentImages = {
  type: typeof ShipmentImagesActionTypes.RESET_SHIPMENT_IMAGES;
};

export type ShipmentImagesActions =
    | GetShipmentImagesRequest
    | GetShipmentImagesSuccess
    | GetShipmentImagesError
    | ResetShipmentImages;
