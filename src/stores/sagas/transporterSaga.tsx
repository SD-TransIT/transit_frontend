import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ITransporter } from 'models/transporter/ITransporter';
import { getTransporterFailure, getTransporterSuccess } from 'stores/actions/transporter/transporterActions';
import TransporterActionTypes from 'stores/actions/transporter/transporterTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient from 'utils/apiClient';

const transporterUrl = 'transporter/';

export const getTransporter = async (parameters: any, isPicker: boolean = true) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const page: number = parameters?.page ?? 1;
  const additionalParamString = parameters.searcher !== null ? `&search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `${transporterUrl}?page=${page}${additionalParamString}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (isPicker) {
    return data;
  }
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

function* getTransporterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { transporters: [ITransporter] } = yield call(getTransporter, {
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
