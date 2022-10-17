import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IShipmentImages } from 'models/shipment/IShipmentImages';
import { getShipmentImagesFailure, getShipmentImagesSuccess } from 'stores/actions/shipmentImages/shipmentImagesActions';
import ShipmentImagesActionTypes from 'stores/actions/shipmentImages/shipmentImagesTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient from 'utils/apiClient';

export const shipmentImagesUrl = 'shipment_details_files/';

export const getImagesRequest = async (shipment: string) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.get(
    `${shipmentImagesUrl}?shipment__id=${shipment}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

function* getShipmentImagesSaga(action: any) {
  try {
    const { shipmentId } = action.payload.payload;
    yield call(refreshAccessToken);
    const response: { shipmentImages: [IShipmentImages] } = yield call(
      getImagesRequest,
      shipmentId,
    );
    yield put(getShipmentImagesSuccess(response));
    yield put({
      type: ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_SUCCESS,
      shipmentImages: response,
    });
  } catch (error: any) {
    yield put(getShipmentImagesFailure(error));
    yield put({
      type: ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_FAILURE,
      error,
    });
  }
}

function* shipmentImagesSaga() {
  yield all([takeLatest(
    ShipmentImagesActionTypes.GET_SHIPMENT_IMAGES_REQUEST,
    getShipmentImagesSaga,
  )]);
  yield all([takeLatest(
    ShipmentImagesActionTypes.RESET_SHIPMENT_IMAGES,
    () => {},
  )]);
}

export default shipmentImagesSaga;
