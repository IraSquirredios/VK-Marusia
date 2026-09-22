export function Loader({ label = 'Загружаем фильмы' }: { label?: string }) {
  return (
    <div className="loader" role="status">
      <span />
      <p>{label}</p>
    </div>
  );
}
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="empty-state">
      <h2>Не удалось загрузить данные</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="button button--primary" onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
}
