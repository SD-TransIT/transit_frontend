import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
});

export type RootSate = ReturnType<typeof rootReducer>;

export default rootReducer;
