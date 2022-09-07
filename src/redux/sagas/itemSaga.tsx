import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';
import { sessionToken } from '../reducers/tokenReducer';
import refreshAccessToken from './utils';
import { IItem } from '../../models/item/IItem';
import ItemActionTypes from '../actions/item/itemTypes';
import {
  deleteItemFailure,
  deleteItemSuccess,
  getItemFailure, getItemSuccess,
  postItemFailure, postItemSuccess,
  putItemFailure, putItemSuccess,
} from '../actions/item/itemActions';

const itemUrl = 'item/';

const getItem = async (parameters: any) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const additionalParamString = parameters.searcher !== null ? `?search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `${itemUrl}${additionalParamString}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

const postItem = async (payload: IItem) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.post(
    itemUrl,
    payload,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

const putItem = async (payload: IItem, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.put(
    `${itemUrl}${id}/`,
    payload,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

const deleteItem = async (id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.delete(
    `${itemUrl}${id}/`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

function* getItemSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { items: [IItem] } = yield call(getItem, {
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
    const responsePost: { item: IItem } = yield call(postItem, action.payload);
    const responseGet: { items: IItem } = yield call(getItem, {
      searcher: action.payload?.search ?? null,
    });
    yield put(postItemSuccess(responsePost));
    yield put({
      type: ItemActionTypes.POST_ITEM_SUCCESS,
      item: responsePost,
      items: responseGet,
    });
  } catch (error: any) {
    const responseGet: { customerType: IItem } = yield call(getItem, {
      searcher: action.payload?.search ?? null,
    });
    yield put(postItemFailure(error));
    yield put({
      type: ItemActionTypes.POST_ITEM_FAILURE,
      items: responseGet,
      error,
    });
  }
}

function* putItemSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { item: IItem } = yield call(
      putItem,
      action.payload,
      action.payload.id,
    );
    const responseGet: { items: IItem } = yield call(getItem, {
      searcher: action.payload?.search ?? null,
    });
    yield put(putItemSuccess(responsePut));
    yield put({
      type: ItemActionTypes.PUT_ITEM_SUCCESS,
      item: responsePut,
      items: responseGet,
    });
  } catch (error: any) {
    const responseGet: { items: IItem } = yield call(getItem, {
      searcher: action.payload?.search ?? null,
    });
    yield put(putItemFailure(error));
    yield put({
      type: ItemActionTypes.PUT_ITEM_FAILURE,
      items: responseGet,
      error,
    });
  }
}

function* deleteItemSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { item: IItem } = yield call(
      deleteItem,
      action.payload.id,
    );
    const responseGet: { items: IItem } = yield call(getItem, {
      searcher: action.payload?.search ?? null,
    });
    yield put(deleteItemSuccess(responseDelete));
    yield put({
      type: ItemActionTypes.DELETE_ITEM_SUCCESS,
      items: responseGet,
    });
  } catch (error: any) {
    const responseGet: { items: IItem } = yield call(getItem, {
      searcher: action.payload?.search ?? null,
    });
    yield put(deleteItemFailure(error));
    yield put({
      type: ItemActionTypes.DELETE_ITEM_FAILURE,
      items: responseGet,
      error,
    });
  }
}

function* ItemSaga() {
  yield all([takeLatest(ItemActionTypes.GET_ITEM_REQUEST, getItemSaga)]);
  yield all([takeLatest(ItemActionTypes.POST_ITEM_REQUEST, postItemSaga)]);
  yield all([takeLatest(ItemActionTypes.PUT_ITEM_REQUEST, putItemSaga)]);
  yield all([takeLatest(
    ItemActionTypes.DELETE_ITEM_REQUEST,
    deleteItemSaga,
  )]);
}

export default ItemSaga;
