import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ISupplierMaster } from 'models/supplierMaster/ISupplierMasterType';
import {
  deleteSupplierMasterFailure,
  deleteSupplierMasterSuccess,
  getSupplierMasterFailure,
  getSupplierMasterSuccess,
  postSupplierMasterFailure,
  postSupplierMasterSuccess,
  putSupplierMasterFailure,
  putSupplierMasterSuccess,
} from 'stores/actions/supplierMaster/supplierMasterActions';
import SupplierMasterActionTypes from 'stores/actions/supplierMaster/supplierMasterTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient from 'utils/apiClient';

const supplierUrl = 'supplier/';

const getSupplierMaster = async (parameters: any) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const additionalParamString = parameters.searcher !== null ? `?search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `${supplierUrl}${additionalParamString}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

const postSupplierMaster = async (payload: ISupplierMaster) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.post(
    supplierUrl,
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

const putSupplierMaster = async (payload: ISupplierMaster, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.put(
    `${supplierUrl}${id}/`,
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

const deleteSupplierMaster = async (id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.delete(
    `${supplierUrl}${id}/`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

function* getSupplierMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { supplierMasters: [ISupplierMaster] } = yield call(getSupplierMaster, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getSupplierMasterSuccess(response));
    yield put({
      type: SupplierMasterActionTypes.GET_SUPPLIER_MASTER_SUCCESS,
      supplierMasters: response,
    });
  } catch (error: any) {
    yield put(getSupplierMasterFailure(error));
    yield put({ type: SupplierMasterActionTypes.GET_SUPPLIER_MASTER_FAILURE, error });
  }
}

function* postSupplierMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { supplierMaster: ISupplierMaster } = yield call(
      postSupplierMaster,
      action.payload,
    );
    const responseGet: { supplierMaster: ISupplierMaster } = yield call(getSupplierMaster, {
      searcher: action.payload?.search ?? null,
    });
    yield put(postSupplierMasterSuccess(responsePost));
    yield put({
      type: SupplierMasterActionTypes.POST_SUPPLIER_MASTER_SUCCESS,
      supplierMaster: responsePost,
      supplierMasters: responseGet,
    });
  } catch (error: any) {
    yield put(postSupplierMasterFailure(error));
    yield put({
      type: SupplierMasterActionTypes.POST_SUPPLIER_MASTER_FAILURE,
      error,
    });
  }
}

function* putSupplierMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { supplierMaster: ISupplierMaster } = yield call(
      putSupplierMaster,
      action.payload,
      action.payload.id,
    );
    const responseGet: { supplierMaster: ISupplierMaster } = yield call(getSupplierMaster, {
      searcher: action.payload?.search ?? null,
    });
    yield put(putSupplierMasterSuccess(responsePut));
    yield put({
      type: SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_SUCCESS,
      supplierMaster: responsePut,
      supplierMasters: responseGet,
    });
  } catch (error: any) {
    yield put(putSupplierMasterFailure(error));
    yield put({
      type: SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_FAILURE,
      error,
    });
  }
}

function* deleteSupplierMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { driver: ISupplierMaster } = yield call(
      deleteSupplierMaster,
      action.payload.id,
    );
    const responseGet: { drivers: ISupplierMaster } = yield call(getSupplierMaster, {
      searcher: action.payload?.search ?? null,
    });
    yield put(deleteSupplierMasterSuccess(responseDelete));
    yield put({
      type: SupplierMasterActionTypes.DELETE_SUPPLIER_MASTER_SUCCESS,
      supplierMasters: responseGet,
    });
  } catch (error: any) {
    const responseGet: { drivers: ISupplierMaster } = yield call(getSupplierMaster, {
      searcher: action.payload?.search ?? null,
    });
    yield put(deleteSupplierMasterFailure(error));
    yield put({
      type: SupplierMasterActionTypes.DELETE_SUPPLIER_MASTER_FAILURE,
      supplierMasters: responseGet,
      error,
    });
  }
}

function* supplierMasterSaga() {
  yield all([
    takeLatest(SupplierMasterActionTypes.GET_SUPPLIER_MASTER_REQUEST, getSupplierMasterSaga),
  ]);
  yield all([
    takeLatest(SupplierMasterActionTypes.POST_SUPPLIER_MASTER_REQUEST, postSupplierMasterSaga),
  ]);
  yield all([
    takeLatest(SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_REQUEST, putSupplierMasterSaga),
  ]);
  yield all([takeLatest(
    SupplierMasterActionTypes.DELETE_SUPPLIER_MASTER_REQUEST,
    deleteSupplierMasterSaga,
  )]);
}

export default supplierMasterSaga;