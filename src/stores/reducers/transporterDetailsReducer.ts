import TransporterDetailsActionTypes from 'stores/actions/transporterDetails/transporterDetailsTypes';
import { TransporterDetailsActions, TransporterDetailsState } from 'stores/types/transporterDetailsType';

const initialState: TransporterDetailsState = {
  fetchingTransporterDetails: false,
  fetchedTransporterDetails: false,
  transporterDetails: [],
  transporterDetail: null,
  error: null,
};

const transporterDetailsReducer = (
  action: TransporterDetailsActions,
  state: TransporterDetailsState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_REQUEST:
      return {
        ...state,
        fetchingTransporterDetails: true,
        fetchedTransporterDetails: false,
        transporterDetails: [],
        error: null,
      };
    case TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingTransporterDetails: false,
        fetchedTransporterDetails: true,
        transporterDetails: action.payload,
        error: null,
      };
    case TransporterDetailsActionTypes.GET_TRANSPORTER_DETAILS_FAILURE:
      return {
        ...state,
        fetchingTransporterDetails: false,
        transporterDetails: [],
        error: action.payload,
      };
    case TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_REQUEST:
      return {
        ...state,
        transporterDetail: null,
        error: null,
      };
    case TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_SUCCESS:
      return {
        ...state,
        transporterDetail: action.payload,
        error: null,
      };
    case TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_FAILURE:
      return {
        ...state,
        transporterDetail: null,
        error: action.payload,
      };
    case TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_REQUEST:
      return {
        ...state,
        transporterDetail: null,
        error: null,
      };
    case TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_SUCCESS:
      return {
        ...state,
        transporterDetail: action.payload,
        error: null,
      };
    case TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_FAILURE:
      return {
        ...state,
        transporterDetail: null,
        error: action.payload,
      };
    case TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
      };
    case TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default transporterDetailsReducer;
