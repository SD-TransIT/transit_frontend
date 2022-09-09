import { IModeOfTransport } from '../../models/modeOfTransport/IModeOfTransport';
import ModeOfTransportActionTypes from '../actions/modeOfTransport/modeOfTransportTypes';

export interface ModeOfTransportState {
  fetchingModeOfTransport: boolean;
  fetchedModeOfTransport: boolean;
  modes: IModeOfTransport [] | [];
  mode: IModeOfTransport | null;
  error: string | null;
}

export interface GetModeOfTransportRequestPayload {
  payload: any;
}

export interface GetModeOfTransportSuccessPayload {
  modes: [IModeOfTransport];
}

export interface GetModeOfTransportErrorPayload {
  error: string;
}

export interface PostModeOfTransportRequestPayload {
  payload: IModeOfTransport;
}

export interface PostModeOfTransportSuccessPayload {
  mode: IModeOfTransport;
}

export interface PostModeOfTransportErrorPayload {
  error: string;
}

export interface PutModeOfTransportRequestPayload {
  payload: IModeOfTransport;
}

export interface PutModeOfTransportSuccessPayload {
  mode: IModeOfTransport;
}

export interface PutModeOfTransportErrorPayload {
  error: string;
}

export interface DeleteModeOfTransportRequestPayload {
  payload: IModeOfTransport;
}

export interface DeleteModeOfTransportSuccessPayload {
}

export interface DeleteModeOfTransportErrorPayload {
  error: string;
}

export interface GetModeOfTransportRequest {
  type: typeof ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_REQUEST;
  payload: GetModeOfTransportRequestPayload;
}

export type GetModeOfTransportSuccess = {
  type: typeof ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_SUCCESS;
  payload: GetModeOfTransportSuccessPayload;
};

export type GetModeOfTransportError = {
  type: typeof ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_FAILURE;
  payload: GetModeOfTransportErrorPayload;
};

export interface PostModeOfTransportRequest {
  type: typeof ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_REQUEST;
  payload: PostModeOfTransportRequestPayload;
}

export type PostModeOfTransportSuccess = {
  type: typeof ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_SUCCESS;
  payload: PostModeOfTransportSuccessPayload;
};

export type PostModeOfTransportError = {
  type: typeof ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_FAILURE;
  payload: PostModeOfTransportErrorPayload;
};

export interface PutModeOfTransportRequest {
  type: typeof ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_REQUEST;
  payload: PutModeOfTransportRequestPayload;
}

export type PutModeOfTransportSuccess = {
  type: typeof ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_SUCCESS;
  payload: PutModeOfTransportSuccessPayload;
};

export type PutModeOfTransportError = {
  type: typeof ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_FAILURE;
  payload: PutModeOfTransportErrorPayload;
};

export interface DeleteModeOfTransportRequest {
  type: typeof ModeOfTransportActionTypes.DELETE_MODE_OF_TRANSPORT_REQUEST;
  payload: DeleteModeOfTransportRequestPayload;
}

export type DeleteModeOfTransportSuccess = {
  type: typeof ModeOfTransportActionTypes.DELETE_MODE_OF_TRANSPORT_SUCCESS;
  payload: DeleteModeOfTransportSuccessPayload;
};

export type DeleteModeOfTransportError = {
  type: typeof ModeOfTransportActionTypes.DELETE_MODE_OF_TRANSPORT_FAILURE;
  payload: DeleteModeOfTransportErrorPayload;
};

export type ModeOfTransportActions =
    | GetModeOfTransportRequest
    | GetModeOfTransportSuccess
    | GetModeOfTransportError
    | PostModeOfTransportRequest
    | PostModeOfTransportSuccess
    | PostModeOfTransportError
    | PutModeOfTransportRequest
    | PutModeOfTransportSuccess
    | PutModeOfTransportError
    | DeleteModeOfTransportRequest
    | DeleteModeOfTransportSuccess
    | DeleteModeOfTransportError;
