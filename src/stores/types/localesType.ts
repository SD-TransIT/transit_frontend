import LocaleActionTypes from "stores/actions/locales/localesTypes";

export interface LocaleState {
  locale: string
}
 
export interface FetchLocaleRequest {
  type: typeof LocaleActionTypes.FETCH_LOCALE_REQUEST;
  payload: string
}  

export interface FetchLocaleSuccess {
  type: typeof LocaleActionTypes.FETCH_LOCALE_SUCCESS;
  payload: string
}  

export interface FetchLocaleError {
  type: typeof LocaleActionTypes.FETCH_LOCALE_FAILURE;
  payload: string
}  


export type LocaleActions = FetchLocaleRequest
  | FetchLocaleSuccess
| FetchLocaleError