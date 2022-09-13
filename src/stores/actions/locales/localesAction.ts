import { FetchLocaleError,FetchLocaleRequest, FetchLocaleSuccess,  } from "stores/types/localesType";
import LocaleActionTypes from "./localesTypes";

export const fetchLocaleRequest = (
  payload: string,
): FetchLocaleRequest => ({
  type: LocaleActionTypes.FETCH_LOCALE_REQUEST,
  payload,
});

export const fetchLocaleSuccess = (
  payload: string,
): FetchLocaleSuccess => ({
  type: LocaleActionTypes.FETCH_LOCALE_SUCCESS,
  payload,
});

export const fetchLocaleFailure = (
  payload: string,
): FetchLocaleError => ({
  type: LocaleActionTypes.FETCH_LOCALE_FAILURE,
  payload,
});