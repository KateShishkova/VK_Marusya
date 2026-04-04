import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@config/api";
import {
  movieResponseSchema,
  type TMovieListResponse,
} from "@schemas/movie.schema";
import type { MovieIdParam } from "./types";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getFavorites: builder.query<TMovieListResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.FAVORITES.ROOT,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.array().parse(response),
    }),
    postFavoriteMovie: builder.mutation<void, MovieIdParam>({
      query: (body) => ({
        url: API_CONFIG.PATHS.FAVORITES.ROOT,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteFavoriteMovie: builder.mutation<void, MovieIdParam>({
      query: (movieId) => ({
        url: API_CONFIG.PATHS.FAVORITES.BY_ID(movieId),
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  usePostFavoriteMovieMutation,
  useDeleteFavoriteMovieMutation,
} = favoritesApi;
