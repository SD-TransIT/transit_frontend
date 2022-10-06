import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { postExcelUploadFailure, postExcelUploadSuccess } from 'stores/actions/excelUpload/excelUploadActions';
import ExcelUploadActionTypes from 'stores/actions/excelUpload/excelUploadTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient from 'utils/apiClient';

export const excelUploadUrl = '/excel_upload/';

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

function* excelUploadSaga() {
  yield all([takeLatest(ExcelUploadActionTypes.POST_EXCEL_UPLOAD_REQUEST, postExcelUploadSaga)]);
}

export default excelUploadSaga;
