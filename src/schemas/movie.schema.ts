import { z } from "zod";

export const movieResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  releaseYear: z.number().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  genres: z.array(z.string()).optional().nullable(),
  plot: z.string().optional().nullable(),
  runtime: z.number().optional().nullable(),
  budget: z.string().optional().nullable(),
  revenue: z.string().optional().nullable(),
  homepage: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  posterUrl: z.string().optional().nullable(),
  backdropUrl: z.string().optional().nullable(),
  trailerUrl: z.string().optional().nullable(),
  trailerYouTubeId: z.string().optional().nullable(),
  tmdbRating: z.number().optional().nullable(),
  searchL: z.string().optional().nullable(),
  keywords: z.array(z.string()).optional().nullable(),
  countriesOfOrigin: z.array(z.string()).optional().nullable(),
  languages: z.array(z.string()).optional().nullable(),
  cast: z.array(z.string()).optional().nullable(),
  director: z.string().optional().nullable(),
  production: z.string().optional().nullable(),
  awardsSummary: z.string().optional().nullable(),
});

export type MovieResponse = z.infer<typeof movieResponseSchema>;
export type MovieListResponse = MovieResponse[];
