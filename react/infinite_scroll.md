```ts
import { useRef, useEffect } from 'react';

interface Options {
  callback?: () => void ;
  element?: HTMLDivElement | null;
}

const useInfiniteScroll = ({ callback, element }: Options) => {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!element || !callback) {
      return;
    }

    observer.current = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callback();
          break;
        }
      }
    });
    observer.current.observe(element);

    return () => observer.current?.unobserve(element);
  }, [callback, element]);
};

export default useInfiniteScroll;
```