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
import refreshAccessToken from 'stores/sagas/utils';
import {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const supplierUrl = 'supplier/';

function* getSupplierMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { supplierMasters: [ISupplierMaster] } = yield call(getRequest, supplierUrl, {
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
      postRequest,
      supplierUrl,
      action.payload,
    );
    yield put(postSupplierMasterSuccess(responsePost));
    yield put({
      type: SupplierMasterActionTypes.POST_SUPPLIER_MASTER_SUCCESS,
      supplierMaster: responsePost,
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
      putRequest,
      supplierUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putSupplierMasterSuccess(responsePut));
    yield put({
      type: SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_SUCCESS,
      supplierMaster: responsePut,
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
      deleteRequest,
      supplierUrl,
      action.payload.id,
    );
    yield put(deleteSupplierMasterSuccess(responseDelete));
    yield put({
      type: SupplierMasterActionTypes.DELETE_SUPPLIER_MASTER_SUCCESS,
      supplierMaster: null,
    });
  } catch (error: any) {
    yield put(deleteSupplierMasterFailure(error));
    yield put({
      type: SupplierMasterActionTypes.DELETE_SUPPLIER_MASTER_FAILURE,
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
