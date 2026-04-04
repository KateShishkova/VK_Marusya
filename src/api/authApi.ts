import { API_CONFIG } from "@config/api";
import {
  userResponseSchema,
  type TUserLogin,
  type TUserRegister,
  type TUserResponse,
} from "@schemas/user.schema";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, TUserLogin>({
      query: (body) => ({
        url: API_CONFIG.PATHS.AUTH.LOGIN,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_CONFIG.PATHS.AUTH.LOGOUT,
        method: "GET",
      }),
      invalidatesTags: ["User"],
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
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterUserMutation,
  useFetchProfileQuery,
} = authApi;
