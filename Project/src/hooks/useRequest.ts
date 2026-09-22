import { useCallback, useEffect, useState } from 'react';

export function useRequest<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setData(await loader());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  }, [loader]);
  useEffect(() => {
    void load();
  }, [load]);
  return { data, loading, error, reload: load };
}
