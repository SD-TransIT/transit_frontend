import { all, fork } from 'redux-saga/effects';
import customerTypeSaga from 'sagas/customerTypeSaga';
import driverSaga from 'sagas/driverSaga';
import ItemSaga from 'sagas/itemSaga';
import manualUploadFormsSaga from 'sagas/manualUploadFormsSaga';
import modeOfTransportSaga from 'sagas/modeOfTransport';
import supplierMasterSaga from 'sagas/supplierMasterSaga';
import tokenSaga from 'sagas/tokenSaga';
import TransporterSaga from 'sagas/transporterSaga';

export default function* rootSaga() {
  yield all([
    fork(tokenSaga),
    fork(customerTypeSaga),
    fork(manualUploadFormsSaga),
    fork(driverSaga),
    fork(supplierMasterSaga),
    fork(TransporterSaga),
    fork(ItemSaga),
    fork(modeOfTransportSaga),
  ]);
}
