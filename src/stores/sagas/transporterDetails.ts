import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ITransporterDetails } from 'models/transporterDetails/ITransporterDetails';
import { getTransporterDetailsFailure, getTransporterDetailsSuccess } from 'stores/actions/transporterDetails/transporterDetailsActions';
import TransporterDetailsActionTypes from 'stores/actions/transporterDetails/transporterDetailsTypes';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

export const transporterDetailsUrl = 'transporter_details/';

function* getTransporterDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { transporterDetails: [ITransporterDetails] } = yield call(
      getRequest,
      transporterDetailsUrl,
      {
        searcher: action.payload?.search ?? null,
      },
    );
    yield put(getTransporterDetailsSuccess(response));
    yield put({
      type: TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_SUCCESS,
      transporters: response,
    });
  } catch (error: any) {
    yield put(getTransporterDetailsFailure(error));
    yield put({
      type: TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_FAILURE,
      error,
    });
  }
}

function* transporterDetailsSaga() {
  yield all([takeLatest(
    TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_REQUEST,
    getTransporterDetailsSaga,
  )]);
}

export default transporterDetailsSaga;
