import { all, fork } from 'redux-saga/effects';
import tokenSaga from './tokenSaga';
import customerTypeSaga from './customerTypeSaga';
import manualUploadFormsSaga from './manualUploadFormsSaga';
import driverSaga from './driverSaga';
import supplierMasterSaga from './supplierMasterSaga';
import TransporterSaga from './transporterSaga';

export default function* rootSaga() {
  yield all([
    fork(tokenSaga),
    fork(customerTypeSaga),
    fork(manualUploadFormsSaga),
    fork(driverSaga),
    fork(supplierMasterSaga),
    fork(TransporterSaga),
  ]);
}
