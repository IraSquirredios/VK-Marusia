import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { movieApi } from '../api/client';
import { ErrorState, Loader } from '../components/Loader';
import { useRequest } from '../hooks/useRequest';

const genreImages = [
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
  'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=800',
];
const displayName = (genre: string) => genre.charAt(0).toUpperCase() + genre.slice(1);

export function GenresPage() {
  const loader = useCallback(() => movieApi.getGenres(), []);
  const { data, loading, error, reload } = useRequest(loader);
  return (
    <main className="page">
      <div className="container">
        <h1 className="page__title">Жанры фильмов</h1>
        {loading && <Loader />}
        {error && <ErrorState message={error} onRetry={reload} />}
        <div className="genre-grid">
          {data?.map((genre, index) => (
            <Link className="genre-card" to={`/genres/${encodeURIComponent(genre)}`} key={genre}>
              <img src={genreImages[index % genreImages.length]} alt="" />
              <strong>{displayName(genre)}</strong>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
