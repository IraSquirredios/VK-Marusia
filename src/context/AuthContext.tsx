import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi, favoritesApi } from '../api/client';
import type { LoginData, Movie, RegisterData, User } from '../types/Movie';

interface AuthValue {
  user: User | null;
  favorites: Movie[];
  loading: boolean;
  login(data: LoginData): Promise<void>;
  register(data: RegisterData): Promise<void>;
  logout(): Promise<void>;
  toggleFavorite(movie: Movie): Promise<void>;
  isFavorite(id: number): boolean;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const profile = await authApi.profile();
    const movies = await favoritesApi.getAll();
    setUser(profile);
    setFavorites(movies);
  };

  useEffect(() => {
    refresh()
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const login = async (data: LoginData) => {
    await authApi.login(data);
    await refresh();
  };
  const register = async (data: RegisterData) => {
    await authApi.register(data);
    await login(data);
  };
  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setFavorites([]);
  };
  const isFavorite = (id: number) => favorites.some((movie) => movie.id === id);
  const toggleFavorite = async (movie: Movie) => {
    if (isFavorite(movie.id)) {
      await favoritesApi.remove(movie.id);
      setFavorites((items) => items.filter(({ id }) => id !== movie.id));
    } else {
      await favoritesApi.add(movie.id);
      setFavorites((items) => [...items, movie]);
    }
  };

  const value = useMemo(
    () => ({ user, favorites, loading, login, register, logout, toggleFavorite, isFavorite }),
    [user, favorites, loading],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth должен использоваться внутри AuthProvider');
  return value;
}
