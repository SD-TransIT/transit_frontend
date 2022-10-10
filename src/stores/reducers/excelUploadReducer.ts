import ExcelUploadActionTypes from 'stores/actions/excelUpload/excelUploadTypes';
import { ExcelUploadActions, ExcelUploadState } from 'stores/types/excelUploadType';

const initialState: ExcelUploadState = {
  uploading: false,
  uploaded: false,
  error: null,
};

const excelUploadReducer = (
  action: ExcelUploadActions,
  state: ExcelUploadState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_REQUEST:
      return {
        ...state,
        error: null,
      };
    case ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ExcelUploadActionTypes.POST_EXCEL_UPLOAD_REQUEST:
      return {
        ...state,
        uploading: true,
        uploaded: false,
        error: null,
      };
    case ExcelUploadActionTypes.POST_EXCEL_UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true,
        error: null,
      };
    case ExcelUploadActionTypes.POST_EXCEL_UPLOAD_FAILURE:
      return {
        ...state,
        uploading: false,
        uploaded: true,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default excelUploadReducer;
