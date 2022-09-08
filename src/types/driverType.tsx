import { IDriver } from 'models/driver/IDriver';

import DriverActionTypes from 'actions/driver/driverTypes';

export interface DriverState {
  fetchingDriver: boolean;
  fetchedDriver: boolean;
  drivers: IDriver [] | [];
  driver: IDriver | null;
  error: string | null;
}

export interface GetDriverRequestPayload {
  payload: any;
}

export interface GetDriverSuccessPayload {
  drivers: [IDriver];
}

export interface GetDriverErrorPayload {
  error: string;
}

export interface PostDriverRequestPayload {
  payload: IDriver;
}

export interface PostDriverSuccessPayload {
  driver: IDriver;
}

export interface PostDriverErrorPayload {
  error: string;
}

export interface PutDriverRequestPayload {
  payload: IDriver;
}

export interface PutDriverSuccessPayload {
  driver: IDriver;
}

export interface PutDriverErrorPayload {
  error: string;
}

export interface DeleteDriverRequestPayload {
  payload: IDriver;
}

export interface DeleteDriverSuccessPayload {
}

export interface DeleteDriverErrorPayload {
  error: string;
}

export interface GetDriverRequest {
  type: typeof DriverActionTypes.GET_DRIVER_REQUEST;
  payload: GetDriverRequestPayload;
}

export type GetDriverSuccess = {
  type: typeof DriverActionTypes.GET_DRIVER_SUCCESS;
  payload: GetDriverSuccessPayload;
};

export type GetDriverError = {
  type: typeof DriverActionTypes.GET_DRIVER_FAILURE;
  payload: GetDriverErrorPayload;
};

export interface PostDriverRequest {
  type: typeof DriverActionTypes.POST_DRIVER_REQUEST;
  payload: PostDriverRequestPayload;
}

export type PostDriverSuccess = {
  type: typeof DriverActionTypes.POST_DRIVER_SUCCESS;
  payload: PostDriverSuccessPayload;
};

export type PostDriverError = {
  type: typeof DriverActionTypes.POST_DRIVER_FAILURE;
  payload: PostDriverErrorPayload;
};

export interface PutDriverRequest {
  type: typeof DriverActionTypes.PUT_DRIVER_REQUEST;
  payload: PutDriverRequestPayload;
}

export type PutDriverSuccess = {
  type: typeof DriverActionTypes.PUT_DRIVER_SUCCESS;
  payload: PutDriverSuccessPayload;
};

export type PutDriverError = {
  type: typeof DriverActionTypes.PUT_DRIVER_FAILURE;
  payload: PutDriverErrorPayload;
};

export interface DeleteDriverRequest {
  type: typeof DriverActionTypes.DELETE_DRIVER_REQUEST;
  payload: DeleteDriverRequestPayload;
}

export type DeleteDriverSuccess = {
  type: typeof DriverActionTypes.DELETE_DRIVER_SUCCESS;
  payload: DeleteDriverSuccessPayload;
};

export type DeleteDriverError = {
  type: typeof DriverActionTypes.DELETE_DRIVER_FAILURE;
  payload: DeleteDriverErrorPayload;
};

export type DriverActions =
    | GetDriverRequest
    | GetDriverSuccess
    | GetDriverError
    | PostDriverRequest
    | PostDriverSuccess
    | PostDriverError
    | PutDriverRequest
    | PutDriverSuccess
    | PutDriverError
    | DeleteDriverRequest
    | DeleteDriverSuccess
    | DeleteDriverError;
