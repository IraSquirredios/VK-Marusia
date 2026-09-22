import type { Movie } from '../types/Movie';
import { MovieCard } from './MovieCard';
export function MovieGrid({
  movies,
  ranked = false,
  onRemove,
}: {
  movies: Movie[];
  ranked?: boolean;
  onRemove?: (movie: Movie) => void;
}) {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          rank={ranked ? index + 1 : undefined}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
