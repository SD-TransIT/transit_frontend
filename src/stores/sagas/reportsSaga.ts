import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { getReportsFailure, getReportsSuccess } from 'stores/actions/reports/reportsActions';
import ReportsActionTypes from 'stores/actions/reports/reportsTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient from 'utils/apiClient';

export const reportsUrl = 'reports';

export const getRequest = async (url: string, parameters: any) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const additionalParamString = parameters.reportName !== null ? `${parameters.reportName}` : '';
  const { startDate } = parameters;
  const { endDate } = parameters;
  const { data } = await apiClient.get(
    `${url}/${additionalParamString}/?format=json&date_from=${startDate}&date_to=${endDate}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

function* getReportsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: {
      reports: []
    } = yield call(getRequest, reportsUrl, {
      reportName: action.payload?.reportName ?? null,
      startDate: action.payload?.startDate ?? null,
      endDate: action.payload?.endDate ?? null,
    });
    yield put(getReportsSuccess(response));
    yield put({
      type: ReportsActionTypes.GET_REPORTS_SUCCESS,
      reports: response,
    });
  } catch (error: any) {
    yield put(getReportsFailure(error));
    yield put({ type: ReportsActionTypes.GET_REPORTS_FAILURE, error });
  }
}

function* reportsSaga() {
  yield all([
    takeLatest(ReportsActionTypes.GET_REPORTS_REQUEST, getReportsSaga),
  ]);
}

export default reportsSaga;
