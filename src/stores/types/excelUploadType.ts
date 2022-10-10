import ExcelUploadActionTypes from 'stores/actions/excelUpload/excelUploadTypes';

export interface ExcelUploadState {
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
}

export interface GetExcelDownloadRequestPayload {
  payload: any;
}

export interface GetExcelDownloadSuccessPayload {
}

export interface GetExcelDownloadErrorPayload {
  error: string;
}

export interface PostExcelUploadRequestPayload {
  payload: any;
}

export interface PostExcelUploadSuccessPayload {
}

export interface PostExcelUploadErrorPayload {
  error: string;
}

export interface GetExcelDownloadRequest {
  type: typeof ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_REQUEST;
  formType: string | null;
}

export type GetExcelDownloadSuccess = {
  type: typeof ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_SUCCESS;
  payload: GetExcelDownloadSuccessPayload;
};

export type GetExcelDownloadError = {
  type: typeof ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_FAILURE;
  payload: GetExcelDownloadErrorPayload;
};

export interface PostExcelUploadRequest {
  type: typeof ExcelUploadActionTypes.POST_EXCEL_UPLOAD_REQUEST;
  payload: PostExcelUploadRequestPayload;
  uploadType: string | null;
}

export type PostExcelUploadSuccess = {
  type: typeof ExcelUploadActionTypes.POST_EXCEL_UPLOAD_SUCCESS;
  payload: PostExcelUploadSuccessPayload;
};

export type PostExcelUploadError = {
  type: typeof ExcelUploadActionTypes.POST_EXCEL_UPLOAD_FAILURE;
  payload: PostExcelUploadErrorPayload;
};

export type ExcelUploadActions =
    | GetExcelDownloadRequest
    | GetExcelDownloadSuccess
    | GetExcelDownloadError
    | PostExcelUploadRequest
    | PostExcelUploadSuccess
    | PostExcelUploadError;
