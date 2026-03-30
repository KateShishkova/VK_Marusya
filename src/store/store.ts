import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@api/authApi";
import { movieApi } from "@api/movieApi";
import { favoritesApi } from "@api/favoritesApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      movieApi.middleware,
      favoritesApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
