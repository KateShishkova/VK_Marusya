export type GetMoviesParams = {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
};

export type GetMoviesInfiniteParams = Omit<GetMoviesParams, "page">;

export type MovieId = string;
export type MovieParams = { id: MovieId };
