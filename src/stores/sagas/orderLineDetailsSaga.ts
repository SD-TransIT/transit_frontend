import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IOrderLineDetailsType } from 'models/orderLineDetails/IOrderLinedetailsType';
import {
  getOrderLineDetailsFailure,
  getOrderLineDetailsSuccess,
  postOrderLineDetailsFailure,
  postOrderLineDetailsSuccess,
} from 'stores/actions/orderLineDetails/orderLineDetailsActions';
import OrderLineDetailsActionTypes from 'stores/actions/orderLineDetails/orderLineDetailsTypes';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest, postRequest } from 'utils/apiClient';

export const orderLineDetailsUrl = 'order_line_details/';

function* getOrderLineDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: {
      orderLineDetails: [IOrderLineDetailsType]
    } = yield call(getRequest, orderLineDetailsUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getOrderLineDetailsSuccess(response));
    yield put({
      type: OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_SUCCESS,
      orderLineDetails: response,
    });
  } catch (error: any) {
    yield put(getOrderLineDetailsFailure(error));
    yield put({ type: OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_FAILURE, error });
  }
}

function* postOrderLineDetailsSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { orderLineDetail: IOrderLineDetailsType } = yield call(
      postRequest,
      action.payload,
      action.payload.id,
    );
    yield put(postOrderLineDetailsSuccess(responsePost));
    yield put({
      type: OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_SUCCESS,
      orderLineDetail: responsePost,
    });
  } catch (error: any) {
    yield put(postOrderLineDetailsFailure(error));
    yield put({
      type: OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_FAILURE,
      error,
    });
  }
}

function* orderLineDetailsSaga() {
  yield all([
    takeLatest(OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_REQUEST, getOrderLineDetailsSaga),
  ]);
  yield all([
    takeLatest(
      OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_REQUEST,
      postOrderLineDetailsSaga,
    ),
  ]);
}

export default orderLineDetailsSaga;
