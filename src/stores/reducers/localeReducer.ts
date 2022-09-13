import LocaleActionTypes from "stores/actions/locales/localesTypes"
import { LocaleActions, LocaleState } from "stores/types/localesType";

const initialState: LocaleState = {
  locale: "en"
};

const localeReducer = ( action: LocaleActions, state: LocaleState = initialState) => {
  // console.log('locale action', action)
  // console.log('locale state', state)
  
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case LocaleActionTypes.FETCH_LOCALE_REQUEST:
      return {
        ...state,
        locale: action.payload
      }
    case LocaleActionTypes.FETCH_LOCALE_SUCCESS:
  console.log('SUCCES',action)

      return {
        ...state,
        locale: action.payload,
      }
    case LocaleActionTypes.FETCH_LOCALE_FAILURE:
      return {
        ...state,
        locale: action.payload
      }
    default:
      return { ...state }
  }
}

export default localeReducer