import { ITransporter } from 'models/transporter/ITransporter';
import TransporterActionTypes from 'actions/transporter/transporterTypes';

export interface TransporterState {
  fetchingTransporter: boolean;
  fetchedTransporter: boolean;
  transporters: ITransporter [] | [];
  transporter: ITransporter | null;
  error: string | null;
}

export interface GetTransporterRequestPayload {
  payload: any;
}

export interface GetTransporterSuccessPayload {
  transporters: [ITransporter];
}

export interface GetTransporterErrorPayload {
  error: string;
}

export interface PostTransporterRequestPayload {
  payload: ITransporter;
}

export interface PostTransporterSuccessPayload {
  transporter: ITransporter;
}

export interface PostTransporterErrorPayload {
  error: string;
}

export interface PutTransporterRequestPayload {
  payload: ITransporter;
}

export interface PutTransporterSuccessPayload {
  transporter: ITransporter;
}

export interface PutTransporterErrorPayload {
  error: string;
}

export interface DeleteTransporterRequestPayload {
  payload: ITransporter;
}

export interface DeleteTransporterSuccessPayload {
}

export interface DeleteTransporterErrorPayload {
  error: string;
}

export interface GetTransporterRequest {
  type: typeof TransporterActionTypes.GET_TRANSPORTER_REQUEST;
  payload: GetTransporterRequestPayload;
}

export type GetTransporterSuccess = {
  type: typeof TransporterActionTypes.GET_TRANSPORTER_SUCCESS;
  payload: GetTransporterSuccessPayload;
};

export type GetTransporterError = {
  type: typeof TransporterActionTypes.GET_TRANSPORTER_FAILURE;
  payload: GetTransporterErrorPayload;
};

export interface PostTransporterRequest {
  type: typeof TransporterActionTypes.POST_TRANSPORTER_REQUEST;
  payload: PostTransporterRequestPayload;
}

export type PostTransporterSuccess = {
  type: typeof TransporterActionTypes.POST_TRANSPORTER_SUCCESS;
  payload: PostTransporterSuccessPayload;
};

export type PostTransporterError = {
  type: typeof TransporterActionTypes.POST_TRANSPORTER_FAILURE;
  payload: PostTransporterErrorPayload;
};

export interface PutTransporterRequest {
  type: typeof TransporterActionTypes.PUT_TRANSPORTER_REQUEST;
  payload: PutTransporterRequestPayload;
}

export type PutTransporterSuccess = {
  type: typeof TransporterActionTypes.PUT_TRANSPORTER_SUCCESS;
  payload: PutTransporterSuccessPayload;
};

export type PutTransporterError = {
  type: typeof TransporterActionTypes.PUT_TRANSPORTER_FAILURE;
  payload: PutTransporterErrorPayload;
};

export interface DeleteTransporterRequest {
  type: typeof TransporterActionTypes.DELETE_TRANSPORTER_REQUEST;
  payload: DeleteTransporterRequestPayload;
}

export type DeleteTransporterSuccess = {
  type: typeof TransporterActionTypes.DELETE_TRANSPORTER_SUCCESS;
  payload: DeleteTransporterSuccessPayload;
};

export type DeleteTransporterError = {
  type: typeof TransporterActionTypes.DELETE_TRANSPORTER_FAILURE;
  payload: DeleteTransporterErrorPayload;
};

export type TransporterActions =
    | GetTransporterRequest
    | GetTransporterSuccess
    | GetTransporterError
    | PostTransporterRequest
    | PostTransporterSuccess
    | PostTransporterError
    | PutTransporterRequest
    | PutTransporterSuccess
    | PutTransporterError
    | DeleteTransporterRequest
    | DeleteTransporterSuccess
    | DeleteTransporterError;
