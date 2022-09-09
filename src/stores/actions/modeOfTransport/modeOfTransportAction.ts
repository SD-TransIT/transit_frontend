import {
  GetModeOfTransportError,
  GetModeOfTransportErrorPayload,
  GetModeOfTransportRequest,
  GetModeOfTransportRequestPayload,
  GetModeOfTransportSuccess,
  GetModeOfTransportSuccessPayload,
  PostModeOfTransportError,
  PostModeOfTransportErrorPayload,
  PostModeOfTransportRequest,
  PostModeOfTransportRequestPayload,
  PostModeOfTransportSuccess,
  PostModeOfTransportSuccessPayload,
  PutModeOfTransportError,
  PutModeOfTransportErrorPayload,
  PutModeOfTransportRequest,
  PutModeOfTransportRequestPayload,
  PutModeOfTransportSuccess,
  PutModeOfTransportSuccessPayload,
} from '../../types/modeOfTransportType';

import ModeOfTransportActionTypes from './modeOfTransportTypes';

export const getModeOfTransportRequest = (
  payload: GetModeOfTransportRequestPayload,
): GetModeOfTransportRequest => ({
  type: ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_REQUEST,
  payload,
});

export const getModeOfTransportSuccess = (
  payload: GetModeOfTransportSuccessPayload,
): GetModeOfTransportSuccess => ({
  type: ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_SUCCESS,
  payload,
});

export const getModeOfTransportFailure = (
  payload: GetModeOfTransportErrorPayload,
): GetModeOfTransportError => ({
  type: ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_FAILURE,
  payload,
});

export const postModeOfTransportRequest = (
  payload: PostModeOfTransportRequestPayload,
): PostModeOfTransportRequest => ({
  type: ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_REQUEST,
  payload,
});

export const postModeOfTransportSuccess = (
  payload: PostModeOfTransportSuccessPayload,
): PostModeOfTransportSuccess => ({
  type: ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_SUCCESS,
  payload,
});

export const postModeOfTransportFailure = (
  payload: PostModeOfTransportErrorPayload,
): PostModeOfTransportError => ({
  type: ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_FAILURE,
  payload,
});

export const putModeOfTransportRequest = (
  payload: PutModeOfTransportRequestPayload,
): PutModeOfTransportRequest => ({
  type: ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_REQUEST,
  payload,
});

export const putModeOfTransportSuccess = (
  payload: PutModeOfTransportSuccessPayload,
): PutModeOfTransportSuccess => ({
  type: ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_SUCCESS,
  payload,
});

export const putModeOfTransportFailure = (
  payload: PutModeOfTransportErrorPayload,
): PutModeOfTransportError => ({
  type: ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_FAILURE,
  payload,
});
