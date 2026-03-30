export type GetMoviesParams = {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
};

export type MovieIdParam = number | string;