import { configureStore, ThunkAction, Action, combineReducers, Middleware, isRejectedWithValue, MiddlewareAPI } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deApi } from "./de";
import counterReducer from "./slices/counter";

const reducer = combineReducers({
  // Added API generated reducer
  [deApi.reducerPath]: deApi.reducer,
  counter: counterReducer
});

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    console.log({action});
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      toast.error(action?.payload?.data?.message)
    }

    return next(action)
  }

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    //getDefaultMiddleware().concat(testApi.middleware),
    getDefaultMiddleware().concat([deApi.middleware, rtkQueryErrorLogger])
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
