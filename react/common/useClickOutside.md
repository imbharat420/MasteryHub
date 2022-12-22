```ts
import { useCallback, useRef, ChangeEvent } from 'react';

import useWindowListener from './useWindowListener';

const useClickOutside = (callback: (e: any) => void) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const handler = useCallback((event: ChangeEvent<HTMLElement>) => {
    if (!elementRef.current?.contains(event.target)) {
      callback(event);
    }
  }, [callback]);

  useWindowListener('mousedown', handler);

  return elementRef;
};

export default useClickOutside;
```