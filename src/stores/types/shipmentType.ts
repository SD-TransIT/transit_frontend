import { IShipment } from 'models/shipment/IShipment';
import ShipmentActionTypes from 'stores/actions/shipment/shipmentTypes';

export interface ShipmentState {
  fetchingShipment: boolean;
  fetchedShipment: boolean;
  shipments: IShipment [] | [];
  shipment: IShipment | null;
  error: string | null;
}

export interface GetShipmentRequestPayload {
  payload: any;
}

export interface GetShipmentSuccessPayload {
  shipments: [IShipment];
}

export interface GetShipmentErrorPayload {
  error: string;
}

export interface PostShipmentRequestPayload {
  payload: IShipment;
}

export interface PostShipmentSuccessPayload {
  shipment: IShipment;
}

export interface PostShipmentErrorPayload {
  error: string;
}

export interface PutShipmentRequestPayload {
  payload: IShipment;
}

export interface PutShipmentSuccessPayload {
  shipment: IShipment;
}

export interface PutShipmentErrorPayload {
  error: string;
}

export interface DeleteShipmentRequestPayload {
  payload: IShipment;
}

export interface DeleteShipmentSuccessPayload {
}

export interface DeleteShipmentErrorPayload {
  error: string;
}

export interface GetShipmentRequest {
  type: typeof ShipmentActionTypes.GET_SHIPMENT_REQUEST;
  payload: GetShipmentRequestPayload;
}

export type GetShipmentSuccess = {
  type: typeof ShipmentActionTypes.GET_SHIPMENT_SUCCESS;
  payload: GetShipmentSuccessPayload;
};

export type GetShipmentError = {
  type: typeof ShipmentActionTypes.GET_SHIPMENT_FAILURE;
  payload: GetShipmentErrorPayload;
};

export interface PostShipmentRequest {
  type: typeof ShipmentActionTypes.POST_SHIPMENT_REQUEST;
  payload: PostShipmentRequestPayload;
}

export type PostShipmentSuccess = {
  type: typeof ShipmentActionTypes.POST_SHIPMENT_SUCCESS;
  payload: PostShipmentSuccessPayload;
};

export type PostShipmentError = {
  type: typeof ShipmentActionTypes.POST_SHIPMENT_FAILURE;
  payload: PostShipmentErrorPayload;
};

export interface PutShipmentRequest {
  type: typeof ShipmentActionTypes.PUT_SHIPMENT_REQUEST;
  payload: PutShipmentRequestPayload;
}

export type PutShipmentSuccess = {
  type: typeof ShipmentActionTypes.PUT_SHIPMENT_SUCCESS;
  payload: PutShipmentSuccessPayload;
};

export type PutShipmentError = {
  type: typeof ShipmentActionTypes.PUT_SHIPMENT_FAILURE;
  payload: PutShipmentErrorPayload;
};

export interface DeleteShipmentRequest {
  type: typeof ShipmentActionTypes.DELETE_SHIPMENT_REQUEST;
  payload: DeleteShipmentRequestPayload;
}

export type DeleteShipmentSuccess = {
  type: typeof ShipmentActionTypes.DELETE_SHIPMENT_SUCCESS;
  payload: DeleteShipmentSuccessPayload;
};

export type DeleteShipmentError = {
  type: typeof ShipmentActionTypes.DELETE_SHIPMENT_FAILURE;
  payload: DeleteShipmentErrorPayload;
};

export type ShipmentActions =
    | GetShipmentRequest
    | GetShipmentSuccess
    | GetShipmentError
    | PostShipmentRequest
    | PostShipmentSuccess
    | PostShipmentError
    | PutShipmentRequest
    | PutShipmentSuccess
    | PutShipmentError
    | DeleteShipmentRequest
    | DeleteShipmentSuccess
    | DeleteShipmentError;
