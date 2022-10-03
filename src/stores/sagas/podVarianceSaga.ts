import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IPodVariance } from 'models/podVariance/IPodVariance';
import {
  deletePodVarianceFailure,
  deletePodVarianceSuccess,
  getPodVarianceFailure,
  getPodVarianceSuccess,
  postPodVarianceFailure,
  postPodVarianceSuccess,
  putPodVarianceFailure,
  putPodVarianceSuccess,
} from 'stores/actions/podVariance/podVarianceActions';
import podVarianceActionTypes from 'stores/actions/podVariance/podVarianceTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient, {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const podVarianceUrl = 'pod_variance/';
export const podVarianceDetailsUrl = 'pod_variance_details/';

export const getPodDetailsByOrdersIdRequest = async (podVariance: string) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.get(
    `${podVarianceDetailsUrl}pod_details_without_pagination/?pod_variance=${podVariance}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

function* getPodVarianceSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { podVariances: [IPodVariance] } = yield call(getRequest, podVarianceUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getPodVarianceSuccess(response));
    yield put({ type: podVarianceActionTypes.GET_POD_VARIANCE_SUCCESS, podVariances: response });
  } catch (error: any) {
    yield put(getPodVarianceFailure(error));
    yield put({ type: podVarianceActionTypes.GET_POD_VARIANCE_FAILURE, error });
  }
}

function* postPodVarianceSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { podVariance: IPodVariance } = yield call(
      postRequest,
      podVarianceUrl,
      action.payload,
    );
    yield put(postPodVarianceSuccess(responsePost));
    yield put({
      type: podVarianceActionTypes.POST_POD_VARIANCE_SUCCESS,
      podVariance: responsePost,
    });
  } catch (error: any) {
    yield put(postPodVarianceFailure(error));
    yield put({
      type: podVarianceActionTypes.POST_POD_VARIANCE_FAILURE,
      error,
    });
  }
}

function* putPodVarianceSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { podVariance: IPodVariance } = yield call(
      putRequest,
      podVarianceUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putPodVarianceSuccess(responsePut));
    yield put({
      type: podVarianceActionTypes.PUT_POD_VARIANCE_SUCCESS,
      podVariance: responsePut,
    });
  } catch (error: any) {
    yield put(putPodVarianceFailure(error));
    yield put({
      type: podVarianceActionTypes.PUT_POD_VARIANCE_FAILURE,
      error,
    });
  }
}

function* deletePodVarianceSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { podVariance: IPodVariance } = yield call(
      deleteRequest,
      podVarianceUrl,
      action.payload.id,
    );
    yield put(deletePodVarianceSuccess(responseDelete));
    yield put({
      type: podVarianceActionTypes.DELETE_POD_VARIANCE_SUCCESS,
      podVariance: null,
    });
  } catch (error: any) {
    yield put(deletePodVarianceFailure(error));
    yield put({
      type: podVarianceActionTypes.DELETE_POD_VARIANCE_FAILURE,
      error,
    });
  }
}

function* podVarianceSaga() {
  yield all([
    takeLatest(podVarianceActionTypes.GET_POD_VARIANCE_REQUEST, getPodVarianceSaga),
  ]);
  yield all([
    takeLatest(podVarianceActionTypes.POST_POD_VARIANCE_REQUEST, postPodVarianceSaga),
  ]);
  yield all([
    takeLatest(podVarianceActionTypes.PUT_POD_VARIANCE_REQUEST, putPodVarianceSaga),
  ]);
  yield all([
    takeLatest(
      podVarianceActionTypes.DELETE_POD_VARIANCE_REQUEST,
      deletePodVarianceSaga,
    )]);
}

export default podVarianceSaga;
