import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import customerTypeReducer from './customerTypeReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  customerType: customerTypeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
