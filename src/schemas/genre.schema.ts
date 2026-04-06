import { z } from "zod";

export const genreResponseSchema = z.string();

export const genreSchema = z.object({
	en: z.string(),
	ru: z.string(),
	img: z.string(),
});

export type GenreResponse = z.infer<typeof genreResponseSchema>;
export type GenreListResponse = GenreResponse[];

export type Genre = z.infer<typeof genreSchema>;