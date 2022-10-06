import ExcelUploadActionTypes from 'stores/actions/excelUpload/excelUploadTypes';

export interface ExcelUploadState {
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
}

export interface PostExcelUploadRequestPayload {
  payload: any;
}

export interface PostExcelUploadSuccessPayload {
}

export interface PostExcelUploadErrorPayload {
  error: string;
}

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
    | PostExcelUploadRequest
    | PostExcelUploadSuccess
    | PostExcelUploadError;
