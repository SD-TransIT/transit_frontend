import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IShipment } from 'models/shipment/IShipment';
import {
  deleteShipmentFailure,
  deleteShipmentSuccess,
  getShipmentFailure, getShipmentSuccess,
  postShipmentFailure, postShipmentSuccess,
  putShipmentFailure,
  putShipmentSuccess,
} from 'stores/actions/shipment/shipmentActions';
import ShipmentActionTypes from 'stores/actions/shipment/shipmentTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient, {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const shipmentUrl = 'shipment_details/';
export const shipmentDetailsFiles = 'shipment_details_files/';

export const addShipmentPhoto = async (
  id: number,
  file: any,
) => {
  if (file.length > 0) {
    const fileData = new FormData();
    fileData.append('file', file[0]);
    fileData.append('shipment', `${id}`);
    const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
    const { data } = await apiClient.post(
      `${shipmentDetailsFiles}`,
      fileData,
      {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data;
  }

  return null;
};

export const updateShipmentOrders = async (
  id: number,
  orders: any,
) => {
  const orderPayload = { orders };
  if (orderPayload.orders.length > 0) {
    await refreshAccessToken();
    await postRequest(
      `/shipment_details_orders/${id}/add_orders_to_shipment/`,
      orderPayload,
    );
  }
};

function* getShipmentSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { shipments: [IShipment] } = yield call(getRequest, shipmentUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getShipmentSuccess(response));
    yield put({ type: ShipmentActionTypes.GET_SHIPMENT_SUCCESS, Shipments: response });
  } catch (error: any) {
    yield put(getShipmentFailure(error));
    yield put({ type: ShipmentActionTypes.GET_SHIPMENT_FAILURE, error });
  }
}

function* postShipmentSaga(action: any) {
  try {
    const shipmentImage = action.payload.shipment_image;
    // eslint-disable-next-line
    delete action.payload.shipment_image;
    yield call(refreshAccessToken);
    const responsePost: { shipment: IShipment } = yield call(
      postRequest,
      shipmentUrl,
      action.payload,
    );
    yield put(postShipmentSuccess(responsePost));
    yield put({
      type: ShipmentActionTypes.POST_SHIPMENT_SUCCESS,
      Shipment: responsePost,
    });
    yield call(
      addShipmentPhoto,
      (responsePost as any).id,
      shipmentImage,
    );
  } catch (error: any) {
    yield put(postShipmentFailure(error));
    yield put({
      type: ShipmentActionTypes.POST_SHIPMENT_FAILURE,
      error,
    });
  }
}

function* putShipmentSaga(action: any) {
  try {
    const shipmentImage = action.payload.shipment_image;
    // eslint-disable-next-line
    delete action.payload.shipment_image;
    yield call(refreshAccessToken);
    const responsePut: { shipment: IShipment } = yield call(
      putRequest,
      shipmentUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putShipmentSuccess(responsePut));
    yield put({
      type: ShipmentActionTypes.PUT_SHIPMENT_SUCCESS,
      Shipment: responsePut,
    });
    yield call(
      addShipmentPhoto,
      action.payload.id,
      shipmentImage,
    );
  } catch (error: any) {
    yield put(putShipmentFailure(error));
    yield put({
      type: ShipmentActionTypes.PUT_SHIPMENT_FAILURE,
      error,
    });
  }
}

function* deleteShipmentSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { shipment: IShipment } = yield call(
      deleteRequest,
      shipmentUrl,
      action.payload.id,
    );
    yield put(deleteShipmentSuccess(responseDelete));
    yield put({
      type: ShipmentActionTypes.DELETE_SHIPMENT_SUCCESS,
      shipment: null,
    });
  } catch (error: any) {
    yield put(deleteShipmentFailure(error));
    yield put({
      type: ShipmentActionTypes.DELETE_SHIPMENT_FAILURE,
      error,
    });
  }
}

function* shipmentSaga() {
  yield all([takeLatest(ShipmentActionTypes.GET_SHIPMENT_REQUEST, getShipmentSaga)]);
  yield all([takeLatest(ShipmentActionTypes.POST_SHIPMENT_REQUEST, postShipmentSaga)]);
  yield all([takeLatest(ShipmentActionTypes.PUT_SHIPMENT_REQUEST, putShipmentSaga)]);
  yield all([takeLatest(
    ShipmentActionTypes.DELETE_SHIPMENT_REQUEST,
    deleteShipmentSaga,
  )]);
}

export default shipmentSaga;
