import {
  GetManualUploadFormsError,
  GetManualUploadFormsErrorPayload,
  GetManualUploadFormsRequest,
  GetManualUploadFormsRequestPayload,
  GetManualUploadFormsSuccess,
  GetManualUploadFormsSuccessPayload,
} from 'types/manualUploadType';

import ManualUploadActionTypes from 'actions/menuUpload/menuUploadTypes';

export const getManualUploadFormsRequest = (
  payload: GetManualUploadFormsRequestPayload,
): GetManualUploadFormsRequest => ({
  type: ManualUploadActionTypes.GET_MANUAL_UPLOAD_REQUEST,
  payload,
});

export const getManualUploadFormsSuccess = (
  payload: GetManualUploadFormsSuccessPayload,
): GetManualUploadFormsSuccess => ({
  type: ManualUploadActionTypes.GET_MANUAL_UPLOAD_SUCCESS,
  payload,
});

export const getManualUploadFormsFailure = (
  payload: GetManualUploadFormsErrorPayload,
): GetManualUploadFormsError => ({
  type: ManualUploadActionTypes.GET_MANUAL_UPLOAD_FAILURE,
  payload,
});
