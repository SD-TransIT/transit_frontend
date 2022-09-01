import CustomerTypeActionTypes from '../actions/customerType/customerTypeTypes';
import { CustomerTypeActions, CustomerTypeState } from '../types/customerType';

const initialState: CustomerTypeState = {
  fetchingCustomerType: false,
  fetchedCustomerType: false,
  customerTypes: [],
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
    default:
      return {
        ...state,
      };
  }
};

export default customerTypeReducer;
