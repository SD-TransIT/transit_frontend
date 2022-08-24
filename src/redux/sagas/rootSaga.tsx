import { all, fork } from 'redux-saga/effects';
import tokenSaga from './tokenSaga';

export default function* rootSaga() {
  yield all([fork(tokenSaga)]);
}
