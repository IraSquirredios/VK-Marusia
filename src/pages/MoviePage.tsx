import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { movieApi } from '../api/client';
import { ErrorState, Loader } from '../components/Loader';
import { MovieHero } from '../components/MovieHero';
import { useRequest } from '../hooks/useRequest';

function Detail({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null;
  return (
    <div className="detail">
      <span>{label}</span>
      <i />
      <strong>{value}</strong>
    </div>
  );
}
export function MoviePage() {
  const { id = '' } = useParams();
  const loader = useCallback(() => movieApi.getById(id), [id]);
  const { data, loading, error, reload } = useRequest(loader);
  if (loading)
    return (
      <main>
        <Loader label="Загружаем фильм" />
      </main>
    );
  if (error || !data)
    return (
      <main className="page">
        <ErrorState message={error} onRetry={reload} />
      </main>
    );
  return (
    <main>
      <MovieHero movie={data} detailed />
      <section className="section">
        <div className="container details">
          <h2>О фильме</h2>
          <Detail label="Язык оригинала" value={data.language} />
          <Detail label="Бюджет" value={data.budget} />
          <Detail label="Выручка" value={data.revenue} />
          <Detail label="Режиссёр" value={data.director} />
          <Detail label="Продакшен" value={data.production} />
          <Detail label="Награды" value={data.awardsSummary} />
        </div>
      </section>
    </main>
  );
}
