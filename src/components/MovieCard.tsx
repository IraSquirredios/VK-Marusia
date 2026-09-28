import { Link } from 'react-router-dom';
import type { Movie } from '../types/Movie';

export function MovieCard({
  movie,
  rank,
  onRemove,
}: {
  movie: Movie;
  rank?: number;
  onRemove?: (movie: Movie) => void;
}) {
  return (
    <article className="movie-card">
      {rank && <span className="movie-card__rank">{rank}</span>}
      {onRemove && (
        <button
          className="movie-card__remove"
          aria-label={`Удалить ${movie.title} из избранного`}
          onClick={(e) => {
            e.preventDefault();
            onRemove(movie);
          }}
        >
          ×
        </button>
      )}
      <Link to={`/movie/${movie.id}`} aria-label={movie.title}>
        <img
          src={movie.posterUrl || movie.backdropUrl}
          alt={`Постер фильма «${movie.title}»`}
          loading="lazy"
        />
        <span className="movie-card__fallback">{movie.title}</span>
      </Link>
    </article>
  );
}
