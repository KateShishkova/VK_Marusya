import { API_CONFIG } from "@config/api";
import {
  movieResponseSchema,
  type MovieListResponse,
} from "@schemas/movie.schema";
import type { MovieId, MovieParams } from "./types";
import { baseApi } from "./baseApi";

export const favoritesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<MovieListResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.FAVORITES.ROOT,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.array().parse(response),
    }),
    postFavoriteMovie: builder.mutation<void, MovieParams>({
      query: (body) => ({
        url: API_CONFIG.PATHS.FAVORITES.ROOT,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteFavoriteMovie: builder.mutation<void, MovieId>({
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
