import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@api/baseApi";
import userReducer from "@store/userSlice";
import type { RootState } from "./store";

export const setupTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      user: userReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState: preloadedState as RootState,
  });
