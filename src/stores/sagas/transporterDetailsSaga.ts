import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ITransporterDetails } from 'models/transporterDetails/ITransporterDetails';
import {
  deleteTransporterDetailsFailure, deleteTransporterDetailsSuccess,
  getTransporterDetailsFailure, getTransporterDetailsSuccess,
  postTransporterDetailsFailure, postTransporterDetailsSuccess,
  putTransporterDetailsFailure, putTransporterDetailsSuccess,
} from 'stores/actions/transporterDetails/transporterDetailsActions';
import TransporterDetailsActionTypes from 'stores/actions/transporterDetails/transporterDetailsTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient, {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const transporterDetailsUrl = 'transporter_details/';

export const getVehiclesByTransporterRequest = async (transporter: string) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.get(
    `${transporterDetailsUrl}vehicles_without_pagination/?transporter=${transporter}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

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
      transporterDetails: response,
    });
  } catch (error: any) {
    yield put(getTransporterDetailsFailure(error));
    yield put({
      type: TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_FAILURE,
      error,
    });
  }
}

function* postTransporterDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { transporterDetail: ITransporterDetails } = yield call(
      postRequest,
      transporterDetailsUrl,
      action.payload,
    );
    yield put(postTransporterDetailsSuccess(responsePost));
    yield put({
      type: TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_SUCCESS,
      transporterDetail: responsePost,
    });
  } catch (error: any) {
    yield put(postTransporterDetailsFailure(error));
    yield put({
      type: TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_FAILURE,
      error,
    });
  }
}

function* putTransporterDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { transporterDetail: ITransporterDetails } = yield call(
      putRequest,
      transporterDetailsUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putTransporterDetailsSuccess(responsePut));
    yield put({
      type: TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_SUCCESS,
      transporterDetail: responsePut,
    });
  } catch (error: any) {
    yield put(putTransporterDetailsFailure(error));
    yield put({
      type: TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_FAILURE,
      error,
    });
  }
}

function* deleteTransporterDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { transporter: ITransporterDetails } = yield call(
      deleteRequest,
      transporterDetailsUrl,
      action.payload.id,
    );
    yield put(deleteTransporterDetailsSuccess(responseDelete));
    yield put({
      type: TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_SUCCESS,
      transporterDetail: null,
    });
  } catch (error: any) {
    yield put(deleteTransporterDetailsFailure(error));
    yield put({
      type: TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_FAILURE,
      error,
    });
  }
}

function* transporterDetailsSaga() {
  yield all([takeLatest(
    TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_REQUEST,
    getTransporterDetailsSaga,
  )]);
  yield all([takeLatest(
    TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_REQUEST,
    postTransporterDetailsSaga,
  )]);
  yield all([takeLatest(
    TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_REQUEST,
    putTransporterDetailsSaga,
  )]);
  yield all([takeLatest(
    TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_REQUEST,
    deleteTransporterDetailsSaga,
  )]);
}

export default transporterDetailsSaga;
