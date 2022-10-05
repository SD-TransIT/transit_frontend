import {
  GetReportsError,
  GetReportsErrorPayload,
  GetReportsRequest,
  GetReportsRequestPayload,
  GetReportsSuccess,
  GetReportsSuccessPayload,
} from 'stores/types/reports';

import ReportsActionTypes from './reportsTypes';

export const getReportsRequest = (
  payload: GetReportsRequestPayload,
): GetReportsRequest => ({
  type: ReportsActionTypes.GET_REPORTS_REQUEST,
  payload,
});

export const getReportsSuccess = (
  payload: GetReportsSuccessPayload,
): GetReportsSuccess => ({
  type: ReportsActionTypes.GET_REPORTS_SUCCESS,
  payload,
});

export const getReportsFailure = (
  payload: GetReportsErrorPayload,
): GetReportsError => ({
  type: ReportsActionTypes.GET_REPORTS_FAILURE,
  payload,
});
