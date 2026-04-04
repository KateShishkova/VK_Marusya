import { API_CONFIG } from "@config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
