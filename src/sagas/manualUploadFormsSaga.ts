import { IManualUploadFormsType } from 'models/manualUploadForms/IManualUploadForms';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import refreshAccessToken from 'sagas/utils';

import { getManualUploadFormsFailure, getManualUploadFormsSuccess } from 'actions/menuUpload/menuUploadActions';
import ManualUploadActionTypes from 'actions/menuUpload/menuUploadTypes';
import { sessionToken } from 'reducers/tokenReducer';
import apiClient from 'utils/apiClient';

const getManualUploadForms = async () => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.get(
    'available_forms/',
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};

function* getManualUploadFormsSaga() {
  try {
    yield call(refreshAccessToken);
    const response:
    { manualUploadForms: [IManualUploadFormsType] } = yield call(getManualUploadForms);
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
