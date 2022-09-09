import DriverActionTypes from 'stores/actions/driver/driverTypes';
import {
  DeleteDriverError,
  DeleteDriverErrorPayload,
  DeleteDriverRequest,
  DeleteDriverRequestPayload,
  DeleteDriverSuccess,
  DeleteDriverSuccessPayload,
  GetDriverError,
  GetDriverErrorPayload,
  GetDriverRequest,
  GetDriverRequestPayload,
  GetDriverSuccess,
  GetDriverSuccessPayload,
  PostDriverError,
  PostDriverErrorPayload,
  PostDriverRequest,
  PostDriverRequestPayload,
  PostDriverSuccess,
  PostDriverSuccessPayload,
  PutDriverError,
  PutDriverErrorPayload,
  PutDriverRequest,
  PutDriverRequestPayload,
  PutDriverSuccess,
  PutDriverSuccessPayload,
} from 'stores/types/driverType';

export const getDriverRequest = (
  payload: GetDriverRequestPayload,
): GetDriverRequest => ({
  type: DriverActionTypes.GET_DRIVER_REQUEST,
  payload,
});

export const getDriverSuccess = (
  payload: GetDriverSuccessPayload,
): GetDriverSuccess => ({
  type: DriverActionTypes.GET_DRIVER_SUCCESS,
  payload,
});

export const getDriverFailure = (
  payload: GetDriverErrorPayload,
): GetDriverError => ({
  type: DriverActionTypes.GET_DRIVER_FAILURE,
  payload,
});

export const postDriverRequest = (
  payload: PostDriverRequestPayload,
): PostDriverRequest => ({
  type: DriverActionTypes.POST_DRIVER_REQUEST,
  payload,
});

export const postDriverSuccess = (
  payload: PostDriverSuccessPayload,
): PostDriverSuccess => ({
  type: DriverActionTypes.POST_DRIVER_SUCCESS,
  payload,
});

export const postDriverFailure = (
  payload: PostDriverErrorPayload,
): PostDriverError => ({
  type: DriverActionTypes.POST_DRIVER_FAILURE,
  payload,
});

export const putDriverRequest = (
  payload: PutDriverRequestPayload,
): PutDriverRequest => ({
  type: DriverActionTypes.PUT_DRIVER_REQUEST,
  payload,
});

export const putDriverSuccess = (
  payload: PutDriverSuccessPayload,
): PutDriverSuccess => ({
  type: DriverActionTypes.PUT_DRIVER_SUCCESS,
  payload,
});

export const putDriverFailure = (
  payload: PutDriverErrorPayload,
): PutDriverError => ({
  type: DriverActionTypes.PUT_DRIVER_FAILURE,
  payload,
});

export const deleteDriverRequest = (
  payload: DeleteDriverRequestPayload,
): DeleteDriverRequest => ({
  type: DriverActionTypes.DELETE_DRIVER_REQUEST,
  payload,
});

export const deleteDriverSuccess = (
  payload: DeleteDriverSuccessPayload,
): DeleteDriverSuccess => ({
  type: DriverActionTypes.DELETE_DRIVER_SUCCESS,
  payload,
});

export const deleteDriverFailure = (
  payload: DeleteDriverErrorPayload,
): DeleteDriverError => ({
  type: DriverActionTypes.DELETE_DRIVER_FAILURE,
  payload,
});
