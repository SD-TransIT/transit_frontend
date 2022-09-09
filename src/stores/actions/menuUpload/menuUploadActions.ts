import ManualUploadActionTypes from 'stores/actions/menuUpload/menuUploadTypes';
import {
  GetManualUploadFormsError,
  GetManualUploadFormsErrorPayload,
  GetManualUploadFormsRequest,
  GetManualUploadFormsRequestPayload,
  GetManualUploadFormsSuccess,
  GetManualUploadFormsSuccessPayload,
} from 'stores/types/manualUploadType';

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
