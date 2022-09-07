import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';
import { sessionToken } from '../reducers/tokenReducer';
import refreshAccessToken from './utils';
import { ITransporter } from '../../models/transporter/ITransporter';
import TransporterActionTypes from '../actions/transporter/transporterTypes';
import { getTransporterFailure, getTransporterSuccess } from '../actions/transporter/transporterActions';

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
