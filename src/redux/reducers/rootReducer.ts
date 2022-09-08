import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import customerTypeReducer from './customerTypeReducer';
import manualUploadFormsReducer from './manualUploadForms';
import driverReducer from './driverReducer';
import supplierMasterReducer from './supplierMasterReducer';
import transporterReducer from './transporterReducer';
import itemReducer from './itemReducer';
import modeOfTransportReducer from './modeOfTransport';

const rootReducer = combineReducers({
  token: tokenReducer,
  customerType: customerTypeReducer,
  manualUploadForms: manualUploadFormsReducer,
  driver: driverReducer,
  supplierMaster: supplierMasterReducer,
  transporter: transporterReducer,
  item: itemReducer,
  modeOfTransport: modeOfTransportReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
