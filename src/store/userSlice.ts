import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserResponse } from "@schemas/user.schema";
import { authApi } from "@api/authApi";

type UserState = {
  user: UserResponse | null;
  isAuth: boolean;
};

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.fetchProfile.matchFulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.user = action.payload;
          state.isAuth = true;
        },
      )
      .addMatcher(authApi.endpoints.fetchProfile.matchRejected, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
