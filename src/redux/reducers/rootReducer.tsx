import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import customerTypeReducer from './customerTypeReducer';
import manualUploadFormsReducer from './manualUploadForms';

const rootReducer = combineReducers({
  token: tokenReducer,
  customerType: customerTypeReducer,
  manualUploadForms: manualUploadFormsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
