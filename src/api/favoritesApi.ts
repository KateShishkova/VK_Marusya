import { API_CONFIG } from "@config/api";
import {
  movieResponseSchema,
  type MovieListResponse,
} from "@schemas/movie.schema";
import { baseApi } from "./baseApi";
import type { MovieId, MovieParams } from "./types";

export const favoritesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<MovieListResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.FAVORITES.ROOT,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.array().parse(response),
      providesTags: ["Favorites"],
    }),
    postFavoriteMovie: builder.mutation<void, MovieParams>({
      query: (body) => ({
        url: API_CONFIG.PATHS.FAVORITES.ROOT,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Favorites"],
    }),
    deleteFavoriteMovie: builder.mutation<void, MovieId>({
      query: (movieId) => ({
        url: API_CONFIG.PATHS.FAVORITES.BY_ID(movieId),
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Favorites"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  usePostFavoriteMovieMutation,
  useDeleteFavoriteMovieMutation,
} = favoritesApi;
