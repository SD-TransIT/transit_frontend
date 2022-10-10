import ExcelUploadActionTypes from 'stores/actions/excelUpload/excelUploadTypes';
import {
  GetExcelDownloadError,
  GetExcelDownloadErrorPayload,
  GetExcelDownloadRequest,
  GetExcelDownloadSuccess,
  GetExcelDownloadSuccessPayload,
  PostExcelUploadError,
  PostExcelUploadErrorPayload,
  PostExcelUploadRequest,
  PostExcelUploadRequestPayload,
  PostExcelUploadSuccess,
  PostExcelUploadSuccessPayload,
} from 'stores/types/excelUploadType';

export const getExcelDownloadRequest = (
  formType: string | null,
): GetExcelDownloadRequest => ({
  type: ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_REQUEST,
  formType,
});

export const getExcelDownloadSuccess = (
  payload: GetExcelDownloadSuccessPayload,
): GetExcelDownloadSuccess => ({
  type: ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_SUCCESS,
  payload,
});

export const getExcelDownloadFailure = (
  payload: GetExcelDownloadErrorPayload,
): GetExcelDownloadError => ({
  type: ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_FAILURE,
  payload,
});

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
