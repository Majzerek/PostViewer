import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 300) => {
  const [debouncValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearInterval(timeout);
  }, [value, delay]);

  return debouncValue;
};
