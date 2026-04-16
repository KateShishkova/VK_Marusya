import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@api/authApi";
import type { UserResponse } from "@schemas/user.schema";

type UserState = {
  user: UserResponse | null;
  isAuth: boolean;
  authStatus: "loading" | "authenticated" | "guest";
};

const initialState: UserState = {
  user: null,
  isAuth: false,
  authStatus: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.isAuth = false;
      state.authStatus = "guest";
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.fetchProfile.matchFulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.user = action.payload;
          state.isAuth = true;
          state.authStatus = "authenticated";
        },
      )
      .addMatcher(authApi.endpoints.fetchProfile.matchRejected, (state) => {
        state.user = null;
        state.isAuth = false;
        state.authStatus = "guest";
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.authStatus = "guest";
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
