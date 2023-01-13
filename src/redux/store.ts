import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { deApi } from "./de";
import counterReducer from "./slices/counter";

const reducer = combineReducers({
  // Added API generated reducer
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
