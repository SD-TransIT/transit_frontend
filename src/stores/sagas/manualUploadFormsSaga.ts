import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IManualUploadFormsType } from 'models/manualUploadForms/IManualUploadForms';
import { getManualUploadFormsFailure, getManualUploadFormsSuccess } from 'stores/actions/menuUpload/menuUploadActions';
import ManualUploadActionTypes from 'stores/actions/menuUpload/menuUploadTypes';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

export const availableFormsUrl = 'available_forms/';

function* getManualUploadFormsSaga() {
  try {
    yield call(refreshAccessToken);
    const response:
    { manualUploadForms: [IManualUploadFormsType] } = yield call(
      getRequest,
      availableFormsUrl,
      { searcher: null },
    );
    yield put(getManualUploadFormsSuccess(response));
    yield put(
      { type: ManualUploadActionTypes.GET_MANUAL_UPLOAD_SUCCESS, manualUploadForms: response },
    );
  } catch (error: any) {
    yield put(getManualUploadFormsFailure(error));
    yield put({ type: ManualUploadActionTypes.GET_MANUAL_UPLOAD_FAILURE, error });
  }
}

function* manualUploadFormsSaga() {
  yield all(
    [takeLatest(ManualUploadActionTypes.GET_MANUAL_UPLOAD_REQUEST, getManualUploadFormsSaga)],
  );
}

export default manualUploadFormsSaga;
