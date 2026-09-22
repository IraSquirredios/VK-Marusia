import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/Movie';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { HeartIcon, RefreshIcon } from './Icons';
import { TrailerModal } from './TrailerModal';

function formatRuntime(runtime: number) {
  return `${Math.floor(runtime / 60)} ч ${runtime % 60} мин`;
}

export function MovieHero({
  movie,
  onRefresh,
  detailed = false,
}: {
  movie: Movie;
  onRefresh?: () => void;
  detailed?: boolean;
}) {
  const navigate = useNavigate();
  const { user, toggleFavorite, isFavorite } = useAuth();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [favoriteBusy, setFavoriteBusy] = useState(false);
  const favorite = isFavorite(movie.id);
  const toggle = async () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    setFavoriteBusy(true);
    try {
      await toggleFavorite(movie);
    } finally {
      setFavoriteBusy(false);
    }
  };
  return (
    <section className="hero">
      <div
        className="hero__backdrop"
        style={{
          backgroundImage: `linear-gradient(90deg, #0a0b0f 0%, rgba(10,11,15,.72) 42%, rgba(10,11,15,.08) 75%), linear-gradient(0deg, #0a0b0f 0%, transparent 35%), url('${movie.backdropUrl || movie.posterUrl}')`,
        }}
      />
      <div className="hero__content">
        <div className="movie-meta">
          <span className={`rating ${movie.tmdbRating >= 8 ? 'rating--great' : ''}`}>
            ★ {movie.tmdbRating.toFixed(1)}
          </span>
          <span>{movie.relaseYear || movie.releaseDate?.slice(0, 4)}</span>
          <span>{movie.genres?.[0]}</span>
          <span>{formatRuntime(movie.runtime)}</span>
        </div>
        <h1>{movie.title}</h1>
        <p>{movie.plot}</p>
        <div className="hero__actions">
          <button className="button button--primary" onClick={() => setTrailerOpen(true)}>
            Трейлер
          </button>
          {!detailed && (
            <button
              className="button button--secondary"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              О фильме
            </button>
          )}
          <button
            className="button button--icon"
            onClick={toggle}
            disabled={favoriteBusy}
            aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <HeartIcon filled={favorite} />
          </button>
          {onRefresh && (
            <button
              className="button button--icon"
              onClick={onRefresh}
              aria-label="Другой случайный фильм"
            >
              <RefreshIcon />
            </button>
          )}
        </div>
      </div>
      {trailerOpen && (
        <TrailerModal
          youtubeId={movie.trailerYoutubeId}
          title={movie.title}
          onClose={() => setTrailerOpen(false)}
        />
      )}{' '}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </section>
  );
}
