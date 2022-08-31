import { all, fork } from 'redux-saga/effects';
import tokenSaga from './tokenSaga';
import customerTypeSaga from './customerTypeSaga';

export default function* rootSaga() {
  yield all([fork(tokenSaga), fork(customerTypeSaga)]);
}
