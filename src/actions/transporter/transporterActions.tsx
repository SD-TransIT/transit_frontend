import TransporterActionTypes from './transporterTypes';
import {
  GetTransporterRequest,
  GetTransporterRequestPayload,
  GetTransporterSuccess,
  GetTransporterSuccessPayload,
  GetTransporterError,
  GetTransporterErrorPayload,
  PostTransporterRequest,
  PostTransporterRequestPayload,
  PostTransporterSuccess,
  PostTransporterSuccessPayload,
  PostTransporterError,
  PostTransporterErrorPayload,
  PutTransporterRequest,
  PutTransporterRequestPayload,
  PutTransporterSuccess,
  PutTransporterSuccessPayload,
  PutTransporterError,
  PutTransporterErrorPayload,
  DeleteTransporterRequest,
  DeleteTransporterRequestPayload,
  DeleteTransporterSuccess,
  DeleteTransporterSuccessPayload,
  DeleteTransporterError,
  DeleteTransporterErrorPayload,
} from '../../types/transporterType';

export const getTransporterRequest = (
  payload: GetTransporterRequestPayload,
): GetTransporterRequest => ({
  type: TransporterActionTypes.GET_TRANSPORTER_REQUEST,
  payload,
});

export const getTransporterSuccess = (
  payload: GetTransporterSuccessPayload,
): GetTransporterSuccess => ({
  type: TransporterActionTypes.GET_TRANSPORTER_SUCCESS,
  payload,
});

export const getTransporterFailure = (
  payload: GetTransporterErrorPayload,
): GetTransporterError => ({
  type: TransporterActionTypes.GET_TRANSPORTER_FAILURE,
  payload,
});

export const postTransporterRequest = (
  payload: PostTransporterRequestPayload,
): PostTransporterRequest => ({
  type: TransporterActionTypes.POST_TRANSPORTER_REQUEST,
  payload,
});

export const postTransporterSuccess = (
  payload: PostTransporterSuccessPayload,
): PostTransporterSuccess => ({
  type: TransporterActionTypes.POST_TRANSPORTER_SUCCESS,
  payload,
});

export const postTransporterFailure = (
  payload: PostTransporterErrorPayload,
): PostTransporterError => ({
  type: TransporterActionTypes.POST_TRANSPORTER_FAILURE,
  payload,
});

export const putTransporterRequest = (
  payload: PutTransporterRequestPayload,
): PutTransporterRequest => ({
  type: TransporterActionTypes.PUT_TRANSPORTER_REQUEST,
  payload,
});

export const putTransporterSuccess = (
  payload: PutTransporterSuccessPayload,
): PutTransporterSuccess => ({
  type: TransporterActionTypes.PUT_TRANSPORTER_SUCCESS,
  payload,
});

export const putTransporterFailure = (
  payload: PutTransporterErrorPayload,
): PutTransporterError => ({
  type: TransporterActionTypes.PUT_TRANSPORTER_FAILURE,
  payload,
});

export const deleteTransporterRequest = (
  payload: DeleteTransporterRequestPayload,
): DeleteTransporterRequest => ({
  type: TransporterActionTypes.DELETE_TRANSPORTER_REQUEST,
  payload,
});

export const deleteTransporterSuccess = (
  payload: DeleteTransporterSuccessPayload,
): DeleteTransporterSuccess => ({
  type: TransporterActionTypes.DELETE_TRANSPORTER_SUCCESS,
  payload,
});

export const deleteTransporterFailure = (
  payload: DeleteTransporterErrorPayload,
): DeleteTransporterError => ({
  type: TransporterActionTypes.DELETE_TRANSPORTER_FAILURE,
  payload,
});
