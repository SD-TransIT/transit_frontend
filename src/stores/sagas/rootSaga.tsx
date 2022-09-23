import { all, fork } from 'redux-saga/effects';

import customerTypeSaga from 'stores/sagas/customerTypeSaga';
import driverSaga from 'stores/sagas/driverSaga';
import itemSaga from 'stores/sagas/itemSaga';
import manualUploadFormsSaga from 'stores/sagas/manualUploadFormsSaga';
import modeOfTransportSaga from 'stores/sagas/modeOfTransport';
import supplierMasterSaga from 'stores/sagas/supplierMasterSaga';
import tokenSaga from 'stores/sagas/tokenSaga';
import transporterSaga from 'stores/sagas/transporterSaga';

import customerMasterSaga from './customerMasterSaga';
import customerWeekDaysSaga from './customerWeekDaysSaga';
import itemDetailSaga from './itemDetailSaga';
import shipmentSaga from './shipmentSaga';
import transporterDetailsSaga from './transporterDetailsSaga';

export default function* rootSaga() {
  yield all([
    fork(tokenSaga),
    fork(customerTypeSaga),
    fork(manualUploadFormsSaga),
    fork(driverSaga),
    fork(supplierMasterSaga),
    fork(transporterSaga),
    fork(itemSaga),
    fork(modeOfTransportSaga),
    fork(shipmentSaga),
    fork(customerMasterSaga),
    fork(itemDetailSaga),
    fork(customerWeekDaysSaga),
    fork(transporterDetailsSaga),
  ]);
}
