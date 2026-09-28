import { useEffect, useState } from 'react';
import { movieApi } from '../api/client';
import type { Movie } from '../types/Movie';
import { SearchIcon } from './Icons';
import { Modal } from './Modal';
import { Link } from 'react-router-dom';

export function SearchModal({ onClose }: { onClose(): void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        setResults(await movieApi.getMovies({ title: query.trim(), count: 5 }));
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [query]);
  return (
    <Modal onClose={onClose} label="Поиск фильма" wide>
      <div className="search-dialog">
        <label className="search-box">
          <SearchIcon />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск"
            aria-label="Название фильма"
          />
        </label>
        <div className="search-results">
          {loading && <p className="muted">Ищем…</p>}
          {!loading && query.length >= 2 && !results.length && (
            <p className="muted">Ничего не найдено</p>
          )}
          {results.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              onClick={onClose}
              className="search-result"
              key={movie.id}
            >
              <img src={movie.posterUrl || movie.backdropUrl} alt="" />
              <div>
                <div className="movie-meta">
                  <span className="rating">★ {movie.tmdbRating.toFixed(1)}</span>
                  <span>{movie.relaseYear || movie.releaseDate?.slice(0, 4)}</span>
                  <span>{movie.genres?.[0]}</span>
                  <span>{movie.runtime} мин</span>
                </div>
                <strong>{movie.title}</strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Modal>
  );
}
