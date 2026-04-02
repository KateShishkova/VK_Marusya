import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@config/api";
import {
  userResponseSchema,
  type TUserLogin,
  type TUserRegister,
  type TUserResponse,
} from "@schemas/user.schema";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    credentials: "include",
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<void, TUserLogin>({
      query: (body) => ({
        url: API_CONFIG.PATHS.AUTH.LOGIN,
        method: "POST",
        body,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_CONFIG.PATHS.AUTH.LOGOUT,
        method: "GET",
      }),
      invalidatesTags: ['User'],
    }),
    registerUser: builder.mutation<void, TUserRegister>({
      query: (body) => ({
        url: API_CONFIG.PATHS.AUTH.REGISTER,
        method: "POST",
        body,
      }),
    }),
    fetchProfile: builder.query<TUserResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.AUTH.PROFILE,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        userResponseSchema.parse(response),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterUserMutation,
  useFetchProfileQuery,
} = authApi;
