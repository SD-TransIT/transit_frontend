import ManualUploadActionTypes from 'stores/actions/menuUpload/menuUploadTypes';
import { ManualUploadFormsActions, ManualUploadFormsState } from 'stores/types/manualUploadType';

const initialState: ManualUploadFormsState = {
  fetchingManualUploadForms: false,
  fetchedManualUploadForms: false,
  manualUploadForms: [],
  error: null,
};

const manualUploadFormsReducer = (
  action: ManualUploadFormsActions,
  state: ManualUploadFormsState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case ManualUploadActionTypes.GET_MANUAL_UPLOAD_REQUEST:
      return {
        ...state,
        fetchingManualUploadForms: true,
        fetchedManualUploadForms: false,
        manualUploadForms: [],
        error: null,
      };
    case ManualUploadActionTypes.GET_MANUAL_UPLOAD_SUCCESS:
      return {
        ...state,
        fetchingManualUploadForms: false,
        fetchedManualUploadForms: true,
        manualUploadForms: action.payload,
        error: null,
      };

    case ManualUploadActionTypes.GET_MANUAL_UPLOAD_FAILURE:
      return {
        ...state,
        fetchingManualUploadForms: false,
        manualUploadForms: [],
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default manualUploadFormsReducer;
