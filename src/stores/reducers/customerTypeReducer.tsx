import CustomerTypeActionTypes from 'stores/actions/customerType/customerTypeTypes';
import { CustomerTypeActions, CustomerTypeState } from 'stores/types/customerType';

const initialState: CustomerTypeState = {
  fetchingCustomerType: false,
  fetchedCustomerType: false,
  customerTypes: [],
  customerType: null,
  error: null,
};

const customerTypeReducer = (
  action: CustomerTypeActions,
  state: CustomerTypeState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case CustomerTypeActionTypes.GET_CUSTOMER_TYPE_REQUEST:
      return {
        ...state,
        fetchingCustomerType: true,
        fetchedCustomerType: false,
        customerTypes: [],
        error: null,
      };
    case CustomerTypeActionTypes.GET_CUSTOMER_TYPE_SUCCESS:
      return {
        ...state,
        fetchingCustomerType: false,
        fetchedCustomerType: true,
        customerTypes: action.payload,
        error: null,
      };
    case CustomerTypeActionTypes.GET_CUSTOMER_TYPE_FAILURE:
      return {
        ...state,
        fetchingCustomerType: false,
        customerTypes: [],
        error: action.payload,
      };
    case CustomerTypeActionTypes.POST_CUSTOMER_TYPE_REQUEST:
      return {
        ...state,
        customerType: null,
        error: null,
      };
    case CustomerTypeActionTypes.POST_CUSTOMER_TYPE_SUCCESS:
      return {
        ...state,
        customerType: action.payload,
        error: null,
      };
    case CustomerTypeActionTypes.POST_CUSTOMER_TYPE_FAILURE:
      return {
        ...state,
        customerType: null,
        error: action.payload,
      };
    case CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_REQUEST:
      return {
        ...state,
        customerType: null,
        error: null,
      };
    case CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_SUCCESS:
      return {
        ...state,
        customerType: action.payload,
        error: null,
      };
    case CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_FAILURE:
      return {
        ...state,
        customerType: null,
        error: action.payload,
      };
    case CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_FAILURE:
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

export default customerTypeReducer;
