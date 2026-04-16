import { API_CONFIG } from "@config/api";
import {
  userResponseSchema,
  type UserLogin,
  type UserRegister,
  type UserResponse,
} from "@schemas/user.schema";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, UserLogin>({
      query: (body) => ({
        url: API_CONFIG.PATHS.AUTH.LOGIN,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Favorites"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_CONFIG.PATHS.AUTH.LOGOUT,
        method: "GET",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      }),
      invalidatesTags: ["User", "Favorites"],
    }),
    registerUser: builder.mutation<void, UserRegister>({
      query: (body) => ({
        url: API_CONFIG.PATHS.AUTH.REGISTER,
        method: "POST",
        body,
      }),
    }),
    fetchProfile: builder.query<UserResponse, void>({
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
