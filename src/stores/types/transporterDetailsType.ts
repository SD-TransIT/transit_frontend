import { ITransporterDetails } from 'models/transporterDetails/ITransporterDetails';
import TransporterDetailsActionTypes from 'stores/actions/transporterDetails/transporterDetailsTypes';

export interface TransporterDetailsState {
  fetchingTransporterDetails: boolean;
  fetchedTransporterDetails: boolean;
  transporterDetails: ITransporterDetails [] | [];
  transporterDetail: ITransporterDetails | null;
  error: string | null;
}

export interface GetTransporterDetailsRequestPayload {
  payload: any;
}

export interface GetTransporterDetailsSuccessPayload {
  transporterDetails: [ITransporterDetails];
}

export interface GetTransporterDetailsErrorPayload {
  error: string;
}

export interface PostTransporterDetailsRequestPayload {
  payload: ITransporterDetails;
}

export interface PostTransporterDetailsSuccessPayload {
  transporterDetail: ITransporterDetails;
}

export interface PostTransporterDetailsErrorPayload {
  error: string;
}

export interface PutTransporterDetailsRequestPayload {
  payload: ITransporterDetails;
}

export interface PutTransporterDetailsSuccessPayload {
  transporterDetail: ITransporterDetails;
}

export interface PutTransporterDetailsErrorPayload {
  error: string;
}

export interface DeleteTransporterDetailsRequestPayload {
  payload: ITransporterDetails;
}

export interface DeleteTransporterDetailsSuccessPayload {
}

export interface DeleteTransporterDetailsErrorPayload {
  error: string;
}

export interface GetTransporterDetailsRequest {
  type: typeof TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_REQUEST;
  payload: GetTransporterDetailsRequestPayload;
}

export type GetTransporterDetailsSuccess = {
  type: typeof TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_SUCCESS;
  payload: GetTransporterDetailsSuccessPayload;
};

export type GetTransporterDetailsError = {
  type: typeof TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_FAILURE;
  payload: GetTransporterDetailsErrorPayload;
};

export interface PostTransporterDetailsRequest {
  type: typeof TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_REQUEST;
  payload: PostTransporterDetailsRequestPayload;
}

export type PostTransporterDetailsSuccess = {
  type: typeof TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_SUCCESS;
  payload: PostTransporterDetailsSuccessPayload;
};

export type PostTransporterDetailsError = {
  type: typeof TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_FAILURE;
  payload: PostTransporterDetailsErrorPayload;
};

export interface PutTransporterDetailsRequest {
  type: typeof TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_REQUEST;
  payload: PutTransporterDetailsRequestPayload;
}

export type PutTransporterDetailsSuccess = {
  type: typeof TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_SUCCESS;
  payload: PutTransporterDetailsSuccessPayload;
};

export type PutTransporterDetailsError = {
  type: typeof TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_FAILURE;
  payload: PutTransporterDetailsErrorPayload;
};

export interface DeleteTransporterDetailsRequest {
  type: typeof TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_REQUEST;
  payload: DeleteTransporterDetailsRequestPayload;
}

export type DeleteTransporterDetailsSuccess = {
  type: typeof TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_SUCCESS;
  payload: DeleteTransporterDetailsSuccessPayload;
};

export type DeleteTransporterDetailsError = {
  type: typeof TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_FAILURE;
  payload: DeleteTransporterDetailsErrorPayload;
};

export type TransporterDetailsActions =
    | GetTransporterDetailsRequest
    | GetTransporterDetailsSuccess
    | GetTransporterDetailsError
    | PostTransporterDetailsRequest
    | PostTransporterDetailsSuccess
    | PostTransporterDetailsError
    | PutTransporterDetailsRequest
    | PutTransporterDetailsSuccess
    | PutTransporterDetailsError
    | DeleteTransporterDetailsRequest
    | DeleteTransporterDetailsSuccess
    | DeleteTransporterDetailsError;
