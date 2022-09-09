import { all, fork } from 'redux-saga/effects';

import customerTypeSaga from 'stores/sagas/customerTypeSaga';
import driverSaga from 'stores/sagas/driverSaga';
import ItemSaga from 'stores/sagas/itemSaga';
import manualUploadFormsSaga from 'stores/sagas/manualUploadFormsSaga';
import modeOfTransportSaga from 'stores/sagas/modeOfTransport';
import supplierMasterSaga from 'stores/sagas/supplierMasterSaga';
import tokenSaga from 'stores/sagas/tokenSaga';
import TransporterSaga from 'stores/sagas/transporterSaga';

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
