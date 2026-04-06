import { API_CONFIG } from "@config/api";
import {
  movieResponseSchema,
  type MovieListResponse,
  type MovieResponse,
} from "@schemas/movie.schema";
import type { GetMoviesParams, MovieId } from "./types";
import {
  genreResponseSchema,
  type GenreListResponse,
} from "@schemas/genre.schema";
import { baseApi } from "./baseApi";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<MovieListResponse, GetMoviesParams>({
      query: (params = {}) => ({
        url: API_CONFIG.PATHS.MOVIE.ROOT,
        params,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.array().parse(response),
    }),

    getTop10Movies: builder.query<MovieListResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.MOVIE.TOP10,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.array().parse(response),
    }),

    getMovieGenres: builder.query<GenreListResponse, void>({
      query: () => ({
        url: API_CONFIG.PATHS.MOVIE.GENRES,
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        genreResponseSchema.array().parse(response),
    }),

    getMovieById: builder.query<MovieResponse, MovieId>({
      query: (movieId) => ({
        url: API_CONFIG.PATHS.MOVIE.BY_ID(movieId),
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        movieResponseSchema.parse(response),
    }),

    getRandomMovie: builder.query<MovieResponse, void>({
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
