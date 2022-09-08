import { IToken } from '../models/token/IToken';
import { ITokenInput, ITokenRefreshInput } from '../models/token/ITokenInput';
import TokenActionTypes from '../actions/token/tokenActionTypes';

export interface TokenState {
  fetchingToken: boolean;
  fetchedToken: boolean;
  token: IToken | null;
  error: string | null;
}

export interface FetchTokenRequestPayload {
  payload: ITokenInput;
}

export interface FetchTokenSuccessPayload {
  token: IToken;
}

export interface FetchTokenFailurePayload {
  error: string;
}

export interface RefreshTokenRequestPayload {
  payload: ITokenRefreshInput;
}

export interface RefreshTokenSuccessPayload {
  token: IToken;
}

export interface RefreshTokenFailurePayload {
  error: string;
}

export interface FetchTokenRequest {
  type: typeof TokenActionTypes.FETCH_TOKEN_REQUEST;
  payload: FetchTokenRequestPayload;
}

export type FetchTokenSuccess = {
  type: typeof TokenActionTypes.FETCH_TOKEN_SUCCESS;
  payload: FetchTokenSuccessPayload;
};

export type FetchTokenFailure = {
  type: typeof TokenActionTypes.FETCH_TOKEN_FAILURE;
  payload: FetchTokenFailurePayload;
};

export interface RefreshTokenRequest {
  type: typeof TokenActionTypes.REFRESH_TOKEN_REQUEST;
  payload: RefreshTokenRequestPayload;
}

export type RefreshTokenSuccess = {
  type: typeof TokenActionTypes.REFRESH_TOKEN_SUCCESS;
  payload: RefreshTokenSuccessPayload;
};

export type RefreshTokenFailure = {
  type: typeof TokenActionTypes.REFRESH_TOKEN_FAILURE;
  payload: RefreshTokenFailurePayload;
};

export type TokenActions =
  | FetchTokenRequest
  | FetchTokenSuccess
  | FetchTokenFailure
  | RefreshTokenRequest
  | RefreshTokenSuccess
  | RefreshTokenFailure;
