import { z } from "zod";

export const genreResponseSchema = z.string();

export const genreSchema = z.object({
	en: z.string(),
	ru: z.string(),
	img: z.string(),
});

export type TGenreResponse = z.infer<typeof genreResponseSchema>;
export type TGenreListResponse = TGenreResponse[];

export type TGenre = z.infer<typeof genreSchema>;