import type { LoginData, Movie, RegisterData, User } from '../types/Movie';

const API_URL = 'https://cinemaguide.skillbox.cc';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { credentials: 'include', ...options });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || `Ошибка запроса (${response.status})`);
  }
  return response.json() as Promise<T>;
}

function formBody(data: object) {
  return new URLSearchParams(Object.entries(data) as string[][]).toString();
}

const formHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };

export const movieApi = {
  getRandom: () => request<Movie>('/movie/random'),
  getTop: () => request<Movie[]>('/movie/top10'),
  getGenres: () => request<string[]>('/movie/genres'),
  getById: (id: string) => request<Movie>(`/movie/${id}`),
  getMovies: (params: Record<string, string | number>) => {
    const query = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)]),
    );
    return request<Movie[]>(`/movie?${query}`);
  },
};

export const authApi = {
  login: (data: LoginData) =>
    request<{ result: boolean }>('/auth/login', {
      method: 'POST',
      headers: formHeaders,
      body: formBody(data),
    }),
  register: (data: RegisterData) =>
    request<{ result: boolean }>('/user', {
      method: 'POST',
      headers: formHeaders,
      body: formBody(data),
    }),
  logout: () => request<{ result: boolean }>('/auth/logout'),
  profile: () => request<User>('/profile'),
};

export const favoritesApi = {
  getAll: () => request<Movie[]>('/favorites'),
  add: (id: number) =>
    request<User>('/favorites', {
      method: 'POST',
      headers: formHeaders,
      body: formBody({ id: String(id) }),
    }),
  remove: (id: number) => request<User>(`/favorites/${id}`, { method: 'DELETE' }),
};
