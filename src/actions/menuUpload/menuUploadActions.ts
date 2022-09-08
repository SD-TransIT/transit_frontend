import ManualUploadActionTypes from './menuUploadTypes';
import {
  GetManualUploadFormsError,
  GetManualUploadFormsErrorPayload,
  GetManualUploadFormsRequest,
  GetManualUploadFormsRequestPayload,
  GetManualUploadFormsSuccess,
  GetManualUploadFormsSuccessPayload,
} from '../../types/manualUploadType';

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
