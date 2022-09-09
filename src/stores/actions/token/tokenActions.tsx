import TokenActionTypes from 'stores/actions/token/tokenActionTypes';
import {
  FetchTokenFailure,
  FetchTokenFailurePayload,
  FetchTokenRequest,
  FetchTokenRequestPayload,
  FetchTokenSuccess,
  FetchTokenSuccessPayload,
  RefreshTokenFailure,
  RefreshTokenFailurePayload,
  RefreshTokenRequest,
  RefreshTokenRequestPayload,
  RefreshTokenSuccess,
  RefreshTokenSuccessPayload,
} from 'stores/types/tokenType';

export const fetchTokenRequest = (
  payload: FetchTokenRequestPayload,
): FetchTokenRequest => ({
  type: TokenActionTypes.FETCH_TOKEN_REQUEST,
  payload,
});

export const fetchTokenSuccess = (
  payload: FetchTokenSuccessPayload,
): FetchTokenSuccess => ({
  type: TokenActionTypes.FETCH_TOKEN_SUCCESS,
  payload,
});

export const fetchTokenFailure = (
  payload: FetchTokenFailurePayload,
): FetchTokenFailure => ({
  type: TokenActionTypes.FETCH_TOKEN_FAILURE,
  payload,
});

export const refreshTokenRequest = (
  payload: RefreshTokenRequestPayload,
): RefreshTokenRequest => ({
  type: TokenActionTypes.REFRESH_TOKEN_REQUEST,
  payload,
});

export const refreshTokenSuccess = (
  payload: RefreshTokenSuccessPayload,
): RefreshTokenSuccess => ({
  type: TokenActionTypes.REFRESH_TOKEN_SUCCESS,
  payload,
});

export const refreshTokenFailure = (
  payload: RefreshTokenFailurePayload,
): RefreshTokenFailure => ({
  type: TokenActionTypes.REFRESH_TOKEN_FAILURE,
  payload,
});
