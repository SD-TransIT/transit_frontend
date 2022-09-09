import { IManualUploadFormsType } from 'models/manualUploadForms/IManualUploadForms';
import ManualUploadActionTypes from 'stores/actions/menuUpload/menuUploadTypes';

export interface ManualUploadFormsState {
  fetchingManualUploadForms: boolean;
  fetchedManualUploadForms: boolean;
  manualUploadForms: IManualUploadFormsType [] | [];
  error: string | null;
}

export interface GetManualUploadFormsRequestPayload {
  payload: any;
}

export interface GetManualUploadFormsSuccessPayload {
  manualUploadForms: [IManualUploadFormsType];
}

export interface GetManualUploadFormsErrorPayload {
  error: string;
}

export interface GetManualUploadFormsRequest {
  type: typeof ManualUploadActionTypes.GET_MANUAL_UPLOAD_REQUEST;
  payload: GetManualUploadFormsRequestPayload;
}

export type GetManualUploadFormsSuccess = {
  type: typeof ManualUploadActionTypes.GET_MANUAL_UPLOAD_SUCCESS;
  payload: GetManualUploadFormsSuccessPayload;
};

export type GetManualUploadFormsError = {
  type: typeof ManualUploadActionTypes.GET_MANUAL_UPLOAD_FAILURE;
  payload: GetManualUploadFormsErrorPayload;
};

export type ManualUploadFormsActions =
    | GetManualUploadFormsRequest
    | GetManualUploadFormsSuccess
    | GetManualUploadFormsError;
