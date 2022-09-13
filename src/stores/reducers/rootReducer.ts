import { combineReducers } from 'redux';

import customerTypeReducer from 'stores/reducers/customerTypeReducer';
import driverReducer from 'stores/reducers/driverReducer';
import itemReducer from 'stores/reducers/itemReducer';
import manualUploadFormsReducer from 'stores/reducers/manualUploadForms';
import modeOfTransportReducer from 'stores/reducers/modeOfTransport';
import supplierMasterReducer from 'stores/reducers/supplierMasterReducer';
import tokenReducer from 'stores/reducers/tokenReducer';
import transporterReducer from 'stores/reducers/transporterReducer';
import localeReducer from './localeReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  customerType: customerTypeReducer,
  manualUploadForms: manualUploadFormsReducer,
  driver: driverReducer,
  supplierMaster: supplierMasterReducer,
  transporter: transporterReducer,
  item: itemReducer,
  modeOfTransport: modeOfTransportReducer,
  locale: localeReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
