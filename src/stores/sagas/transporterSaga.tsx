import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ITransporter } from 'models/transporter/ITransporter';
import { getTransporterFailure, getTransporterSuccess } from 'stores/actions/transporter/transporterActions';
import TransporterActionTypes from 'stores/actions/transporter/transporterTypes';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

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

function* TransporterSaga() {
  yield all([takeLatest(TransporterActionTypes.GET_TRANSPORTER_REQUEST, getTransporterSaga)]);
}

export default TransporterSaga;
