import { all, fork } from 'redux-saga/effects';
import tokenSaga from './tokenSaga';

export function* rootSaga() {
  yield all([fork(tokenSaga)]);
}
