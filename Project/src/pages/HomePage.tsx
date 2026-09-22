import { useCallback } from 'react';
import { movieApi } from '../api/client';
import { ErrorState, Loader } from '../components/Loader';
import { MovieGrid } from '../components/MovieGrid';
import { MovieHero } from '../components/MovieHero';
import { useRequest } from '../hooks/useRequest';

export function HomePage() {
  const randomLoader = useCallback(() => movieApi.getRandom(), []);
  const topLoader = useCallback(() => movieApi.getTop(), []);
  const random = useRequest(randomLoader);
  const top = useRequest(topLoader);
  return (
    <main>
      {random.loading && <Loader label="Выбираем фильм для вас" />}
      {random.error && <ErrorState message={random.error} onRetry={random.reload} />}{' '}
      {random.data && <MovieHero movie={random.data} onRefresh={random.reload} />}
      <section className="section">
        <div className="container">
          <h2>Топ 10 фильмов</h2>
          {top.loading && <Loader />}
          {top.error && <ErrorState message={top.error} onRetry={top.reload} />}{' '}
          {top.data && <MovieGrid movies={top.data} ranked />}
        </div>
      </section>
    </main>
  );
}
