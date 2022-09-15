import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IItem } from 'models/item/IItem';
import {
  deleteItemFailure,
  deleteItemSuccess,
  getItemFailure, getItemSuccess,
  postItemFailure, postItemSuccess,
  putItemFailure, putItemSuccess,
} from 'stores/actions/item/itemActions';
import ItemActionTypes from 'stores/actions/item/itemTypes';
import refreshAccessToken from 'stores/sagas/utils';
import {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const itemUrl = 'item/';

function* getItemSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { items: [IItem] } = yield call(getRequest, itemUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getItemSuccess(response));
    yield put({ type: ItemActionTypes.GET_ITEM_SUCCESS, items: response });
  } catch (error: any) {
    yield put(getItemFailure(error));
    yield put({ type: ItemActionTypes.GET_ITEM_FAILURE, error });
  }
}

function* postItemSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { item: IItem } = yield call(
      postRequest,
      itemUrl,
      action.payload,
    );
    yield put(postItemSuccess(responsePost));
    yield put({
      type: ItemActionTypes.POST_ITEM_SUCCESS,
      item: responsePost,
    });
  } catch (error: any) {
    yield put(postItemFailure(error));
    yield put({
      type: ItemActionTypes.POST_ITEM_FAILURE,
      error,
    });
  }
}

function* putItemSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { item: IItem } = yield call(
      putRequest,
      itemUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putItemSuccess(responsePut));
    yield put({
      type: ItemActionTypes.PUT_ITEM_SUCCESS,
      item: responsePut,
    });
  } catch (error: any) {
    yield put(putItemFailure(error));
    yield put({
      type: ItemActionTypes.PUT_ITEM_FAILURE,
      error,
    });
  }
}

function* deleteItemSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { item: IItem } = yield call(
      deleteRequest,
      itemUrl,
      action.payload.id,
    );
    yield put(deleteItemSuccess(responseDelete));
    yield put({
      type: ItemActionTypes.DELETE_ITEM_SUCCESS,
      item: null,
    });
  } catch (error: any) {
    yield put(deleteItemFailure(error));
    yield put({
      type: ItemActionTypes.DELETE_ITEM_FAILURE,
      error,
    });
  }
}

function* itemSaga() {
  yield all([takeLatest(ItemActionTypes.GET_ITEM_REQUEST, getItemSaga)]);
  yield all([takeLatest(ItemActionTypes.POST_ITEM_REQUEST, postItemSaga)]);
  yield all([takeLatest(ItemActionTypes.PUT_ITEM_REQUEST, putItemSaga)]);
  yield all([takeLatest(
    ItemActionTypes.DELETE_ITEM_REQUEST,
    deleteItemSaga,
  )]);
}

export default itemSaga;
