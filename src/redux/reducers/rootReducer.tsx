import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import customerTypeReducer from './customerTypeReducer';
import manualUploadFormsReducer from './manualUploadForms';
import driverReducer from './driverReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  customerType: customerTypeReducer,
  manualUploadForms: manualUploadFormsReducer,
  driver: driverReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
