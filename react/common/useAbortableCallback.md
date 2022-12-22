```ts
import { useCallback, useRef } from 'react';

const useAbortableCallback = <T>(callback: (...args: any[]) => Promise<T>) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const getAbortSignal = useCallback(() => {
    if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current.signal;
  }, []);

  return useCallback((...args: any[]) => {
    const signal = getAbortSignal();
    return new Promise<T>((resolve, reject) => {
      signal.addEventListener('abort', reject);
      callback(...args).then(resolve).catch(reject);
    });
  }, [callback, getAbortSignal]);
};

export default useAbortableCallback;
```