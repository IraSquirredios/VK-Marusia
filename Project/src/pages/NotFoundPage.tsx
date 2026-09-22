import { Link } from 'react-router-dom';
export function NotFoundPage() {
  return (
    <main className="page">
      <div className="empty-state">
        <strong className="not-found">404</strong>
        <h1>Страница не найдена</h1>
        <Link className="button button--primary" to="/">
          На главную
        </Link>
      </div>
    </main>
  );
}
