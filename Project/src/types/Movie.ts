export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  relaseYear?: number;
  releaseDate: string;
  genres: string[];
  plot: string;
  runtime: number;
  budget: string;
  revenue: string;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYoutubeId: string;
  tmdbRating: number;
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string;
  awardsSummary: string;
}

export interface User {
  name: string;
  surname: string;
  email: string;
  favorites: string[];
}
export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData extends LoginData {
  name: string;
  surname: string;
}
