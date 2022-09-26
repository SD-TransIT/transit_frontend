import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IOrderDetails } from 'models/orderDetails/IOrderDetails';
import {
  deleteOrderDetailsFailure,
  deleteOrderDetailsSuccess,
  getOrderDetailsFailure,
  getOrderDetailsSuccess,
  postOrderDetailsFailure,
  postOrderDetailsSuccess,
  putOrderDetailsFailure,
  putOrderDetailsSuccess,
} from 'stores/actions/orderDetails/orderDetailsActions';
import OrderDetailsActionTypes from 'stores/actions/orderDetails/orderDetailsTypes';
import refreshAccessToken from 'stores/sagas/utils';
import {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const orderDetailsUrl = 'order_details/';

function* getOrderDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { orderDetails: [IOrderDetails] } = yield call(getRequest, orderDetailsUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getOrderDetailsSuccess(response));
    yield put({ type: OrderDetailsActionTypes.GET_ORDER_DETAILS_SUCCESS, orderDetails: response });
  } catch (error: any) {
    yield put(getOrderDetailsFailure(error));
    yield put({ type: OrderDetailsActionTypes.GET_ORDER_DETAILS_FAILURE, error });
  }
}

function* postOrderDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { orderDetail: IOrderDetails } = yield call(
      postRequest,
      orderDetailsUrl,
      action.payload,
    );
    yield put(postOrderDetailsSuccess(responsePost));
    yield put({
      type: OrderDetailsActionTypes.POST_ORDER_DETAILS_SUCCESS,
      orderDetail: responsePost,
    });
  } catch (error: any) {
    yield put(postOrderDetailsFailure(error));
    yield put({
      type: OrderDetailsActionTypes.POST_ORDER_DETAILS_FAILURE,
      error,
    });
  }
}

function* putOrderDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { orderDetail: IOrderDetails } = yield call(
      putRequest,
      orderDetailsUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putOrderDetailsSuccess(responsePut));
    yield put({
      type: OrderDetailsActionTypes.PUT_ORDER_DETAILS_SUCCESS,
      orderDetail: responsePut,
    });
  } catch (error: any) {
    yield put(putOrderDetailsFailure(error));
    yield put({
      type: OrderDetailsActionTypes.PUT_ORDER_DETAILS_FAILURE,
      error,
    });
  }
}

function* deleteOrderDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { orderDetail: IOrderDetails } = yield call(
      deleteRequest,
      orderDetailsUrl,
      action.payload.id,
    );
    yield put(deleteOrderDetailsSuccess(responseDelete));
    yield put({
      type: OrderDetailsActionTypes.DELETE_ORDER_DETAILS_SUCCESS,
      orderDetail: null,
    });
  } catch (error: any) {
    yield put(deleteOrderDetailsFailure(error));
    yield put({
      type: OrderDetailsActionTypes.DELETE_ORDER_DETAILS_FAILURE,
      error,
    });
  }
}

function* orderDetailsSaga() {
  yield all([
    takeLatest(OrderDetailsActionTypes.GET_ORDER_DETAILS_REQUEST, getOrderDetailsSaga),
  ]);
  yield all([
    takeLatest(OrderDetailsActionTypes.POST_ORDER_DETAILS_REQUEST, postOrderDetailsSaga),
  ]);
  yield all([
    takeLatest(OrderDetailsActionTypes.PUT_ORDER_DETAILS_REQUEST, putOrderDetailsSaga),
  ]);
  yield all([
    takeLatest(
      OrderDetailsActionTypes.DELETE_ORDER_DETAILS_REQUEST,
      deleteOrderDetailsSaga,
    )]);
}

export default orderDetailsSaga;
