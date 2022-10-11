import ReportsActionTypes from 'stores/actions/reports/reportsTypes';

export interface ReportsState {
  fetchingReport: boolean;
  fetchedReport: boolean;
  reports: [] | null;
  error: string | null;
}

export interface GetReportsRequestPayload {
  reportName: string,
  startDate: string,
  endDate: string;
}

export interface GetReportsSuccessPayload {
  reports: []
}

export interface GetReportsErrorPayload {
  error: string;
}

export interface GetReportsRequest {
  type: typeof ReportsActionTypes.GET_REPORTS_REQUEST;
  payload: GetReportsRequestPayload;
}

export type GetReportsSuccess = {
  type: typeof ReportsActionTypes.GET_REPORTS_SUCCESS;
  payload: GetReportsSuccessPayload;
};

export type GetReportsError = {
  type: typeof ReportsActionTypes.GET_REPORTS_FAILURE;
  payload: GetReportsErrorPayload;
};

export type ReportsActions =
    | GetReportsRequest
    | GetReportsSuccess
    | GetReportsError;
