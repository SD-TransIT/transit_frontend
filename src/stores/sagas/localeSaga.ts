import LocaleActionTypes from "stores/actions/locales/localesTypes";
import {
  all, put, takeLatest,
} from 'redux-saga/effects';
import { fetchLocaleSuccess } from "stores/actions/locales/localesAction";

export const pageLanguage: string = 'pageLanguage';

function* setLocaleSaga(action: any) {
  const locale = { locale: action.payload }
  // console.log('XXXX')
    
  try {
    // yield put(fetchLocaleSuccess(locale));
    yield put({
      type: LocaleActionTypes.FETCH_LOCALE_SUCCESS,
      payload: locale,
    });

    localStorage.setItem(pageLanguage, JSON.stringify(locale));

  } catch (error: any) {
    yield put({type: LocaleActionTypes.FETCH_LOCALE_FAILURE})
  }
}

function* localeSaga() {
  yield all([takeLatest(LocaleActionTypes.FETCH_LOCALE_REQUEST, setLocaleSaga)]);
 
}

export default localeSaga;
