import { useCallback, useEffect, useRef, useState } from 'react';

type AsyncFn<T> = (signal: AbortSignal) => Promise<T>;

type UseAbortReqResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

export const useAsyncRequest = <T>(
  asyncReqFc: AsyncFn<T>,
  dependencies: React.DependencyList = [],
  enabled = true,
): UseAbortReqResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    asyncReqFc(signal)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;
        setError(err);
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, dependencies);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
    return () => {
      controllerRef.current?.abort();
    };
  }, [...dependencies, enabled, fetchData]);

  return { data, loading, error, refetch: fetchData };
};
