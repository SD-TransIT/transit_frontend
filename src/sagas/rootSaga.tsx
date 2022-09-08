import { all, fork } from 'redux-saga/effects';
import tokenSaga from 'sagas/tokenSaga';
import customerTypeSaga from 'sagas/customerTypeSaga';
import manualUploadFormsSaga from 'sagas/manualUploadFormsSaga';
import driverSaga from 'sagas/driverSaga';
import supplierMasterSaga from 'sagas/supplierMasterSaga';
import TransporterSaga from 'sagas/transporterSaga';
import ItemSaga from 'sagas/itemSaga';
import modeOfTransportSaga from 'sagas/modeOfTransport';

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
