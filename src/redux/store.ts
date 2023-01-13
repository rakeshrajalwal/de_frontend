import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { testApi } from './base.service';
import { baseApi } from "./de.service";
import { deApi } from "./de";
import counterReducer from "./slices/counter";

const reducer = combineReducers({
  // Added API generated reducer
  [testApi.reducerPath]: testApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [deApi.reducerPath]: deApi.reducer,
  counter: counterReducer
});

export const store = configureStore({
  // reducer: {
  //   counter: counterReducer,
  // },
  reducer,
  middleware: (getDefaultMiddleware) =>
    //getDefaultMiddleware().concat(testApi.middleware),
    getDefaultMiddleware().concat(deApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
