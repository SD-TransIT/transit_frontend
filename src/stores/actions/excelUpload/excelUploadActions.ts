import ExcelUploadActionTypes from 'stores/actions/excelUpload/excelUploadTypes';
import {
  PostExcelUploadError,
  PostExcelUploadErrorPayload,
  PostExcelUploadRequest,
  PostExcelUploadRequestPayload,
  PostExcelUploadSuccess,
  PostExcelUploadSuccessPayload,
} from 'stores/types/excelUploadType';

export const postExcelUploadRequest = (
  payload: PostExcelUploadRequestPayload,
  uploadType: string | null,
): PostExcelUploadRequest => ({
  type: ExcelUploadActionTypes.POST_EXCEL_UPLOAD_REQUEST,
  payload,
  uploadType,
});

export const postExcelUploadSuccess = (
  payload: PostExcelUploadSuccessPayload,
): PostExcelUploadSuccess => ({
  type: ExcelUploadActionTypes.POST_EXCEL_UPLOAD_SUCCESS,
  payload,
});

export const postExcelUploadFailure = (
  payload: PostExcelUploadErrorPayload,
): PostExcelUploadError => ({
  type: ExcelUploadActionTypes.POST_EXCEL_UPLOAD_FAILURE,
  payload,
});
