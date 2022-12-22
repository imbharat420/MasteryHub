```ts
import { useEffect, useRef } from 'react';

import { IBoundingClientRect } from 'types';

interface Options {
  callback: (isIntersecting: boolean, boundingClientRect?: IBoundingClientRect) => void;
  element: HTMLDivElement | null;
  threshold?: number[] | number;
  root?: null | Element;
  rootMargin?: string;
}

const useElementObserver = ({ callback, element, threshold, root, rootMargin }: Options) => {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!element) return;

    observer.current = new IntersectionObserver(entries => {
      for (const entry of entries) {
        callback(entry.isIntersecting, entry.boundingClientRect);
      }
    }, {
      threshold,
      root,
      rootMargin,
    });
    observer.current.observe(element);

    return () => observer.current?.unobserve(element);
  }, [callback, element, root, rootMargin, threshold]);
};

export default useElementObserver;
```