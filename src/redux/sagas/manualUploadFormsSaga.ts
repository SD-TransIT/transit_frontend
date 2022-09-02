import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';
import { sessionToken } from '../reducers/tokenReducer';
import isAuthenticated from '../../utils/authHelper';
import { IToken } from '../../models/token/IToken';
import { refreshToken } from './tokenSaga';
import { IManualUploadFormsType } from '../../models/manualUploadForms/IManualUploadForms';
import { getManualUploadFormsFailure, getManualUploadFormsSuccess } from '../actions/menuUpload/menuUploadActions';
import ManualUploadActionTypes from '../actions/menuUpload/menuUploadTypes';

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
    if (isAuthenticated() === false) {
      const { refresh } = JSON.parse(localStorage.getItem(sessionToken) as string);
      const responseRefresh: { token: IToken } = yield call(refreshToken, {
        refresh,
      });
      localStorage.setItem(sessionToken, JSON.stringify(responseRefresh));
    }
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
