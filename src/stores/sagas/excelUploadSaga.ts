import _ from 'lodash';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import {
  getExcelDownloadFailure, getExcelDownloadSuccess, postExcelUploadFailure, postExcelUploadSuccess,
} from 'stores/actions/excelUpload/excelUploadActions';
import ExcelUploadActionTypes from 'stores/actions/excelUpload/excelUploadTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient from 'utils/apiClient';

export const excelUploadUrl = '/excel_upload/';
export const excelDownloadUrl = '/download_excel_template/';

export const postRequest = async (url: string, uploadType: string, payload: any) => {
  const fileData = new FormData();
  fileData.append('file', payload);
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.post(
    `${url}${uploadType}/`,
    fileData,
    {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export const getRequest = async (url: string, formType: string) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.get(
    `${url}?form_type=${formType}`,
    {
      responseType: 'blob',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

function* postExcelUploadSaga(action: any) {
  try {
    const { uploadType } = action;
    // eslint-disable-next-line
    delete action.uploadType;
    yield call(refreshAccessToken);
    const responsePost: {} = yield call(
      postRequest,
      excelUploadUrl,
      uploadType,
      action.payload,
    );
    yield put(postExcelUploadSuccess(responsePost));
    yield put({
      type: ExcelUploadActionTypes.POST_EXCEL_UPLOAD_SUCCESS,
    });
  } catch (error: any) {
    yield put(postExcelUploadFailure(error));
    yield put({
      type: ExcelUploadActionTypes.POST_EXCEL_UPLOAD_FAILURE,
      error,
    });
  }
}

function* getExcelDownloadSaga(action: any) {
  try {
    const { formType } = action;
    yield call(refreshAccessToken);
    const responseGet: {} = yield call(
      getRequest,
      excelDownloadUrl,
      formType,
    );
    const url = window.URL.createObjectURL(new Blob([responseGet as any]));
    const link = document.createElement('a');
    link.href = url;
    const filename = _.upperFirst(_.camelCase(formType));
    link.setAttribute('download', `${filename}Example.xlsx`);
    document.body.appendChild(link);
    link.click();
    yield put(getExcelDownloadSuccess(responseGet));
    yield put({
      type: ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_SUCCESS,
    });
  } catch (error: any) {
    yield put(getExcelDownloadFailure(error));
    yield put({
      type: ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_FAILURE,
      error,
    });
  }
}

function* excelUploadSaga() {
  yield all([takeLatest(ExcelUploadActionTypes.POST_EXCEL_UPLOAD_REQUEST, postExcelUploadSaga)]);
  yield all([takeLatest(ExcelUploadActionTypes.GET_EXCEL_DOWNLOAD_REQUEST, getExcelDownloadSaga)]);
}

export default excelUploadSaga;
