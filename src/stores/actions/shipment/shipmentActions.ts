import ShipmentActionTypes from 'stores/actions/shipment/shipmentTypes';
import {
  DeleteShipmentError,
  DeleteShipmentErrorPayload,
  DeleteShipmentRequest,
  DeleteShipmentRequestPayload,
  DeleteShipmentSuccess,
  DeleteShipmentSuccessPayload,
  GetShipmentError,
  GetShipmentErrorPayload,
  GetShipmentRequest,
  GetShipmentRequestPayload,
  GetShipmentSuccess,
  GetShipmentSuccessPayload,
  PostShipmentError,
  PostShipmentErrorPayload,
  PostShipmentRequest,
  PostShipmentRequestPayload,
  PostShipmentSuccess,
  PostShipmentSuccessPayload,
  PutShipmentError,
  PutShipmentErrorPayload,
  PutShipmentRequest,
  PutShipmentRequestPayload,
  PutShipmentSuccess,
  PutShipmentSuccessPayload,
} from 'stores/types/shipmentType';

export const getShipmentRequest = (
  payload: GetShipmentRequestPayload,
): GetShipmentRequest => ({
  type: ShipmentActionTypes.GET_SHIPMENT_REQUEST,
  payload,
});

export const getShipmentSuccess = (
  payload: GetShipmentSuccessPayload,
): GetShipmentSuccess => ({
  type: ShipmentActionTypes.GET_SHIPMENT_SUCCESS,
  payload,
});

export const getShipmentFailure = (
  payload: GetShipmentErrorPayload,
): GetShipmentError => ({
  type: ShipmentActionTypes.GET_SHIPMENT_FAILURE,
  payload,
});

export const postShipmentRequest = (
  payload: PostShipmentRequestPayload,
): PostShipmentRequest => ({
  type: ShipmentActionTypes.POST_SHIPMENT_REQUEST,
  payload,
});

export const postShipmentSuccess = (
  payload: PostShipmentSuccessPayload,
): PostShipmentSuccess => ({
  type: ShipmentActionTypes.POST_SHIPMENT_SUCCESS,
  payload,
});

export const postShipmentFailure = (
  payload: PostShipmentErrorPayload,
): PostShipmentError => ({
  type: ShipmentActionTypes.POST_SHIPMENT_FAILURE,
  payload,
});

export const putShipmentRequest = (
  payload: PutShipmentRequestPayload,
): PutShipmentRequest => ({
  type: ShipmentActionTypes.PUT_SHIPMENT_REQUEST,
  payload,
});

export const putShipmentSuccess = (
  payload: PutShipmentSuccessPayload,
): PutShipmentSuccess => ({
  type: ShipmentActionTypes.PUT_SHIPMENT_SUCCESS,
  payload,
});

export const putShipmentFailure = (
  payload: PutShipmentErrorPayload,
): PutShipmentError => ({
  type: ShipmentActionTypes.PUT_SHIPMENT_FAILURE,
  payload,
});

export const deleteShipmentRequest = (
  payload: DeleteShipmentRequestPayload,
): DeleteShipmentRequest => ({
  type: ShipmentActionTypes.DELETE_SHIPMENT_REQUEST,
  payload,
});

export const deleteShipmentSuccess = (
  payload: DeleteShipmentSuccessPayload,
): DeleteShipmentSuccess => ({
  type: ShipmentActionTypes.DELETE_SHIPMENT_SUCCESS,
  payload,
});

export const deleteShipmentFailure = (
  payload: DeleteShipmentErrorPayload,
): DeleteShipmentError => ({
  type: ShipmentActionTypes.DELETE_SHIPMENT_FAILURE,
  payload,
});
