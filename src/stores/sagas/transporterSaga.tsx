import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ITransporter } from 'models/transporter/ITransporter';
import {
  deleteTransporterFailure, deleteTransporterSuccess,
  getTransporterFailure, getTransporterSuccess,
  postTransporterFailure, postTransporterSuccess,
  putTransporterFailure, putTransporterSuccess,
} from 'stores/actions/transporter/transporterActions';
import TransporterActionTypes from 'stores/actions/transporter/transporterTypes';
import refreshAccessToken from 'stores/sagas/utils';
import {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const transporterUrl = 'transporter/';

function* getTransporterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { transporters: [ITransporter] } = yield call(getRequest, transporterUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getTransporterSuccess(response));
    yield put({ type: TransporterActionTypes.GET_TRANSPORTER_SUCCESS, transporters: response });
  } catch (error: any) {
    yield put(getTransporterFailure(error));
    yield put({ type: TransporterActionTypes.GET_TRANSPORTER_FAILURE, error });
  }
}

function* postTransporterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { transporter: ITransporter } = yield call(
      postRequest,
      transporterUrl,
      action.payload,
    );
    yield put(postTransporterSuccess(responsePost));
    yield put({
      type: TransporterActionTypes.POST_TRANSPORTER_SUCCESS,
      transporter: responsePost,
    });
  } catch (error: any) {
    yield put(postTransporterFailure(error));
    yield put({
      type: TransporterActionTypes.POST_TRANSPORTER_FAILURE,
      error,
    });
  }
}

function* putTransporterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { transporter: ITransporter } = yield call(
      putRequest,
      transporterUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putTransporterSuccess(responsePut));
    yield put({
      type: TransporterActionTypes.PUT_TRANSPORTER_SUCCESS,
      transporter: responsePut,
    });
  } catch (error: any) {
    yield put(putTransporterFailure(error));
    yield put({
      type: TransporterActionTypes.PUT_TRANSPORTER_FAILURE,
      error,
    });
  }
}

function* deleteTransporterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { transporter: ITransporter } = yield call(
      deleteRequest,
      transporterUrl,
      action.payload.id,
    );
    yield put(deleteTransporterSuccess(responseDelete));
    yield put({
      type: TransporterActionTypes.DELETE_TRANSPORTER_SUCCESS,
      transporter: null,
    });
  } catch (error: any) {
    yield put(deleteTransporterFailure(error));
    yield put({
      type: TransporterActionTypes.DELETE_TRANSPORTER_FAILURE,
      error,
    });
  }
}

function* transporterSaga() {
  yield all([takeLatest(TransporterActionTypes.GET_TRANSPORTER_REQUEST, getTransporterSaga)]);
  yield all([takeLatest(TransporterActionTypes.POST_TRANSPORTER_REQUEST, postTransporterSaga)]);
  yield all([takeLatest(TransporterActionTypes.PUT_TRANSPORTER_REQUEST, putTransporterSaga)]);
  yield all([takeLatest(
    TransporterActionTypes.DELETE_TRANSPORTER_REQUEST,
    deleteTransporterSaga,
  )]);
}

export default transporterSaga;
