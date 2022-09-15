import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { IItemDetails } from 'models/itemDetails/IItemDetails';
import {
  deleteItemDetailFailure,
  deleteItemDetailSuccess,
  getItemDetailFailure,
  getItemDetailSuccess,
  postItemDetailFailure,
  postItemDetailSuccess,
  putItemDetailFailure,
  putItemDetailSuccess,
} from 'stores/actions/item_detail/itemDetailActions';
import ItemDetailActionTypes from 'stores/actions/item_detail/itemDetailTypes';
import refreshAccessToken from 'stores/sagas/utils';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'utils/apiClient';

export const itemDetailUrl = 'item_details/';

function* getItemDetailSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { itemsDetails: [IItemDetails] } = yield call(getRequest, itemDetailUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getItemDetailSuccess(response));
    yield put({ type: ItemDetailActionTypes.GET_ITEM_DETAIL_SUCCESS, itemsDetails: response });
  } catch (error: any) {
    yield put(getItemDetailFailure(error));
    yield put({ type: ItemDetailActionTypes.GET_ITEM_DETAIL_FAILURE, error });
  }
}

function* postItemDetailSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { itemDetail: IItemDetails } = yield call(
      postRequest,
      itemDetailUrl,
      action.payload,
    );
    yield put(postItemDetailSuccess(responsePost));
    yield put({
      type: ItemDetailActionTypes.POST_ITEM_DETAIL_SUCCESS,
      itemDetail: responsePost,
    });
  } catch (error: any) {
    yield put(postItemDetailFailure(error));
    yield put({
      type: ItemDetailActionTypes.POST_ITEM_DETAIL_FAILURE,
      error,
    });
  }
}

function* putItemDetailSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { itemDetail: IItemDetails } = yield call(
      putRequest,
      itemDetailUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putItemDetailSuccess(responsePut));
    yield put({
      type: ItemDetailActionTypes.PUT_ITEM_DETAIL_SUCCESS,
      itemDetail: responsePut,
    });
  } catch (error: any) {
    yield put(putItemDetailFailure(error));
    yield put({
      type: ItemDetailActionTypes.PUT_ITEM_DETAIL_FAILURE,
      error,
    });
  }
}

function* deleteItemDetailSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { itemDetail: IItemDetails } = yield call(
      deleteRequest,
      itemDetailUrl,
      action.payload.id,
    );
    yield put(deleteItemDetailSuccess(responseDelete));
    yield put({
      type: ItemDetailActionTypes.DELETE_ITEM_DETAIL_SUCCESS,
      itemDetail: null,
    });
  } catch (error: any) {
    yield put(deleteItemDetailFailure(error));
    yield put({
      type: ItemDetailActionTypes.DELETE_ITEM_DETAIL_FAILURE,
      error,
    });
  }
}

function* itemDetailSaga() {
  yield all([takeLatest(ItemDetailActionTypes.GET_ITEM_DETAIL_REQUEST, getItemDetailSaga)]);
  yield all([takeLatest(ItemDetailActionTypes.POST_ITEM_DETAIL_REQUEST, postItemDetailSaga)]);
  yield all([takeLatest(ItemDetailActionTypes.PUT_ITEM_DETAIL_REQUEST, putItemDetailSaga)]);
  yield all([takeLatest(
    ItemDetailActionTypes.DELETE_ITEM_DETAIL_REQUEST,
    deleteItemDetailSaga,
  )]);
}

export default itemDetailSaga;
