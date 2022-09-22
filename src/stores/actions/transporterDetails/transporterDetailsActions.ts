import TransporterDetailsActionTypes from 'stores/actions/transporterDetails/transporterDetailsTypes';
import {
  DeleteTransporterDetailsError,
  DeleteTransporterDetailsErrorPayload,
  DeleteTransporterDetailsRequest,
  DeleteTransporterDetailsRequestPayload,
  DeleteTransporterDetailsSuccess,
  DeleteTransporterDetailsSuccessPayload,
  GetTransporterDetailsError,
  GetTransporterDetailsErrorPayload,
  GetTransporterDetailsRequest,
  GetTransporterDetailsRequestPayload,
  GetTransporterDetailsSuccess,
  GetTransporterDetailsSuccessPayload,
  PostTransporterDetailsError,
  PostTransporterDetailsErrorPayload,
  PostTransporterDetailsRequest,
  PostTransporterDetailsRequestPayload,
  PostTransporterDetailsSuccess,
  PostTransporterDetailsSuccessPayload,
  PutTransporterDetailsError,
  PutTransporterDetailsErrorPayload,
  PutTransporterDetailsRequest,
  PutTransporterDetailsRequestPayload,
  PutTransporterDetailsSuccess,
  PutTransporterDetailsSuccessPayload,
} from 'stores/types/transporterDetailsType';

export const getTransporterDetailsRequest = (
  payload: GetTransporterDetailsRequestPayload,
): GetTransporterDetailsRequest => ({
  type: TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_REQUEST,
  payload,
});

export const getTransporterDetailsSuccess = (
  payload: GetTransporterDetailsSuccessPayload,
): GetTransporterDetailsSuccess => ({
  type: TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_SUCCESS,
  payload,
});

export const getTransporterDetailsFailure = (
  payload: GetTransporterDetailsErrorPayload,
): GetTransporterDetailsError => ({
  type: TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_FAILURE,
  payload,
});

export const postTransporterDetailsRequest = (
  payload: PostTransporterDetailsRequestPayload,
): PostTransporterDetailsRequest => ({
  type: TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_REQUEST,
  payload,
});

export const postTransporterDetailsSuccess = (
  payload: PostTransporterDetailsSuccessPayload,
): PostTransporterDetailsSuccess => ({
  type: TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_SUCCESS,
  payload,
});

export const postTransporterDetailsFailure = (
  payload: PostTransporterDetailsErrorPayload,
): PostTransporterDetailsError => ({
  type: TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_FAILURE,
  payload,
});

export const putTransporterDetailsRequest = (
  payload: PutTransporterDetailsRequestPayload,
): PutTransporterDetailsRequest => ({
  type: TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_REQUEST,
  payload,
});

export const putTransporterDetailsSuccess = (
  payload: PutTransporterDetailsSuccessPayload,
): PutTransporterDetailsSuccess => ({
  type: TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_SUCCESS,
  payload,
});

export const putTransporterDetailsFailure = (
  payload: PutTransporterDetailsErrorPayload,
): PutTransporterDetailsError => ({
  type: TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_FAILURE,
  payload,
});

export const deleteTransporterDetailsRequest = (
  payload: DeleteTransporterDetailsRequestPayload,
): DeleteTransporterDetailsRequest => ({
  type: TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_REQUEST,
  payload,
});

export const deleteTransporterDetailsSuccess = (
  payload: DeleteTransporterDetailsSuccessPayload,
): DeleteTransporterDetailsSuccess => ({
  type: TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_SUCCESS,
  payload,
});

export const deleteTransporterDetailsFailure = (
  payload: DeleteTransporterDetailsErrorPayload,
): DeleteTransporterDetailsError => ({
  type: TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_FAILURE,
  payload,
});
