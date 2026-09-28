import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieApi } from '../api/client';
import { BackIcon } from '../components/Icons';
import { ErrorState, Loader } from '../components/Loader';
import { MovieGrid } from '../components/MovieGrid';
import type { Movie } from '../types/Movie';

export function GenrePage() {
  const { genre = '' } = useParams();
  const decoded = decodeURIComponent(genre);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const marker = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMovies([]);
    setPage(0);
    setHasMore(true);
  }, [decoded]);
  useEffect(() => {
    let active = true;
    setLoading(true);
    movieApi
      .getMovies({ genre: decoded, count: 10, page })
      .then((next) => {
        if (!active) return;
        setMovies((items) => (page === 0 ? next : [...items, ...next]));
        setHasMore(next.length === 10);
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Ошибка загрузки'))
      .finally(() => setLoading(false));
    return () => {
      active = false;
    };
  }, [decoded, page]);
  useEffect(() => {
    const target = marker.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) setPage((value) => value + 1);
      },
      { rootMargin: '300px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loading]);
  return (
    <main className="page">
      <div className="container">
        <button className="back-title" onClick={() => history.back()}>
          <BackIcon />
          <h1>{decoded.charAt(0).toUpperCase() + decoded.slice(1)}</h1>
        </button>
        {error && <ErrorState message={error} />}
        <MovieGrid movies={movies} />
        {loading && <Loader />}
        <div ref={marker} />
        {!hasMore && movies.length > 0 && (
          <p className="end-message">Вы посмотрели все фильмы жанра</p>
        )}
      </div>
    </main>
  );
}
