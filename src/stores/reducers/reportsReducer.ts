import ReportsActionTypes from 'stores/actions/reports/reportsTypes';
import { ReportsActions, ReportsState } from 'stores/types/reports';

const initialState: ReportsState = {
  fetchingReport: false,
  fetchedReport: false,
  reports: null,
  error: null,
};

const reportsReducer = (
  action: ReportsActions,
  state: ReportsState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case ReportsActionTypes.GET_REPORTS_REQUEST:
      return {
        ...state,
        fetchingReports: true,
        fetchedReport: false,
        reports: null,
        error: null,
      };
    case ReportsActionTypes.GET_REPORTS_SUCCESS:
      return {
        ...state,
        fetchingReports: false,
        fetchedReport: true,
        reports: action.payload,
        error: null,
      };
    case ReportsActionTypes.GET_REPORTS_FAILURE:
      return {
        ...state,
        fetchingReports: false,
        reports: null,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reportsReducer;
