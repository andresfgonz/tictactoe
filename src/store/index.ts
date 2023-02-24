import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { rootReducer } from './root.reducer';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(logger),
});
