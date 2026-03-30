import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@config/api";
import {
  movieResponseSchema,
  type TMovieListResponse,
  type TMovieResponse,
} from "@schemas/movie.schema";
import type { GetMoviesParams, MovieIdParam } from "./types";
import {
  genreResponseSchema,
  type TGenreListResponse,
} from "@schemas/genre.schema";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<TMovieListResponse, GetMoviesParams>({
      query: (params = {}) => ({
        url: API_CONFIG.PATHS.MOVIE.ROOT,
        params,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.array().parse(response),
    }),

    getTop10Movies: builder.query<TMovieListResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.MOVIE.TOP10,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.array().parse(response),
    }),

    getMovieGenres: builder.query<TGenreListResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.MOVIE.GENRES,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        genreResponseSchema.array().parse(response),
    }),

    getMovieById: builder.query<TMovieResponse, MovieIdParam>({
      query: (movieId) => ({
        url: API_CONFIG.PATHS.MOVIE.BY_ID(movieId),
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.parse(response),
    }),

    getRandomMovie: builder.query<TMovieResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.MOVIE.RANDOM,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.parse(response),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetTop10MoviesQuery,
  useGetMovieGenresQuery,
  useGetMovieByIdQuery,
  useGetRandomMovieQuery,
} = movieApi;
