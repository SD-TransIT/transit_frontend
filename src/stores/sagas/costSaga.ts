import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ICost } from 'models/cost/ICost';
import {
  deleteCostFailure,
  deleteCostSuccess,
  getCostFailure, getCostSuccess,
  postCostFailure, postCostSuccess,
  putCostFailure, putCostSuccess,
} from 'stores/actions/cost/costActions';
import CostActionTypes from 'stores/actions/cost/costTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient, {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const costUrl = 'cost/';
export const shipmentWithCost = '/shipment_details_cost/get_shipments_with_cost/';
export const shipmentWithoutCost = '/shipment_details_cost/get_shipments_without_cost/';

export const getCostRequest = async (parameters: any, isPagination: boolean = false) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const page: number = parameters?.page ?? 1;
  const additionalParamString = parameters.searcher !== null ? `&search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `${costUrl}?page=${page}${additionalParamString}&transporter_base_cost__isnull=False`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (isPagination) {
    return data;
  }
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

function* getCostSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { costs: [ICost] } = yield call(getRequest, costUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getCostSuccess(response));
    yield put({ type: CostActionTypes.GET_COST_SUCCESS, Costs: response });
  } catch (error: any) {
    yield put(getCostFailure(error));
    yield put({ type: CostActionTypes.GET_COST_FAILURE, error });
  }
}

function* postCostSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { cost: ICost } = yield call(
      postRequest,
      costUrl,
      action.payload,
    );
    yield put(postCostSuccess(responsePost));
    yield put({
      type: CostActionTypes.POST_COST_SUCCESS,
      cost: responsePost,
    });
  } catch (error: any) {
    yield put(postCostFailure(error));
    yield put({
      type: CostActionTypes.POST_COST_FAILURE,
      error,
    });
  }
}

function* putCostSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { cost: ICost } = yield call(
      putRequest,
      costUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putCostSuccess(responsePut));
    yield put({
      type: CostActionTypes.PUT_COST_SUCCESS,
      cost: responsePut,
    });
  } catch (error: any) {
    yield put(putCostFailure(error));
    yield put({
      type: CostActionTypes.PUT_COST_FAILURE,
      error,
    });
  }
}

function* deleteCostSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { cost: ICost } = yield call(
      deleteRequest,
      costUrl,
      action.payload.id,
    );
    yield put(deleteCostSuccess(responseDelete));
    yield put({
      type: CostActionTypes.DELETE_COST_SUCCESS,
      cost: null,
    });
  } catch (error: any) {
    yield put(deleteCostFailure(error));
    yield put({
      type: CostActionTypes.DELETE_COST_FAILURE,
      error,
    });
  }
}

function* costSaga() {
  yield all([takeLatest(CostActionTypes.GET_COST_REQUEST, getCostSaga)]);
  yield all([takeLatest(CostActionTypes.POST_COST_REQUEST, postCostSaga)]);
  yield all([takeLatest(CostActionTypes.PUT_COST_REQUEST, putCostSaga)]);
  yield all([takeLatest(
    CostActionTypes.DELETE_COST_REQUEST,
    deleteCostSaga,
  )]);
}

export default costSaga;
