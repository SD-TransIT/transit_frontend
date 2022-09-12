import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IModeOfTransport } from '../../models/modeOfTransport/IModeOfTransport';
import {
  deleteRequest, getRequest, postRequest, putRequest,
} from '../../utils/apiClient';
import {
  deleteModeOfTransportFailure,
  deleteModeOfTransportSuccess,
  getModeOfTransportFailure,
  getModeOfTransportSuccess,
  postModeOfTransportFailure,
  postModeOfTransportSuccess,
  putModeOfTransportFailure,
  putModeOfTransportSuccess,
} from '../actions/modeOfTransport/modeOfTransportAction';
import ModeOfTransportActionTypes from '../actions/modeOfTransport/modeOfTransportTypes';

import refreshAccessToken from './utils';

const modeOfTransportUrl = 'mode_of_transport/';

function* getModeOfTransportSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { modes: [IModeOfTransport] } = yield call(getRequest, modeOfTransportUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getModeOfTransportSuccess(response));
    yield put({
      type: ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_SUCCESS,
      modes: response,
    });
  } catch (error: any) {
    yield put(getModeOfTransportFailure(error));
    yield put({ type: ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_FAILURE, error });
  }
}

function* postModeOfTransportSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { mode: IModeOfTransport } = yield call(
      postRequest,
      modeOfTransportUrl,
      action.payload,
    );
    yield put(postModeOfTransportSuccess(responsePost));
    yield put({
      type: ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_SUCCESS,
      mode: responsePost,
    });
  } catch (error: any) {
    yield put(postModeOfTransportFailure(error));
    yield put({
      type: ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_FAILURE,
      error,
    });
  }
}

function* putModeOfTransportSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { mode: IModeOfTransport } = yield call(
      putRequest,
      modeOfTransportUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putModeOfTransportSuccess(responsePut));
    yield put({
      type: ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_SUCCESS,
      mode: responsePut,
    });
  } catch (error: any) {
    yield put(putModeOfTransportFailure(error));
    yield put({
      type: ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_FAILURE,
      error,
    });
  }
}

function* deleteModeOfTransportSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { driver: IModeOfTransport } = yield call(
      deleteRequest,
      modeOfTransportUrl,
      action.payload.id,
    );
    yield put(deleteModeOfTransportSuccess(responseDelete));
    yield put({
      type: ModeOfTransportActionTypes.DELETE_MODE_OF_TRANSPORT_SUCCESS,
      mode: null,
    });
  } catch (error: any) {
    yield put(deleteModeOfTransportFailure(error));
    yield put({
      type: ModeOfTransportActionTypes.DELETE_MODE_OF_TRANSPORT_FAILURE,
      error,
    });
  }
}

function* modeOfTransportSaga() {
  yield all([
    takeLatest(ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_REQUEST, getModeOfTransportSaga),
  ]);
  yield all([
    takeLatest(ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_REQUEST, postModeOfTransportSaga),
  ]);
  yield all([
    takeLatest(ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_REQUEST, putModeOfTransportSaga),
  ]);
  yield all([takeLatest(
    ModeOfTransportActionTypes.DELETE_MODE_OF_TRANSPORT_REQUEST,
    deleteModeOfTransportSaga,
  )]);
}

export default modeOfTransportSaga;
