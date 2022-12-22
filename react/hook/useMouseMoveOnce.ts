import { useCallback, useRef } from 'react';
import useMount from '@picsart/rc/useMount';

const useMouseMoveOnce = (handler: (mouseMoveEvent: MouseEvent, ...args: any[]) => void) => {
  const handlerRef = useRef<((event: MouseEvent) => void) | null>(null);
  const attachEvent = useCallback(
    (...args: any[]) => {
      const eventHandler = (event: MouseEvent) => {
        handler(event, ...args);
      };
      handlerRef.current = eventHandler;
      document.addEventListener('mousemove', eventHandler);

      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', eventHandler);
        },
        { once: true },
      );
    },
    [handler],
  );

  useMount(() => () => {
    if (handlerRef.current) {
      document.removeEventListener('mousemove', handlerRef.current);
    }
  });

  return attachEvent;
};

export default useMouseMoveOnce;
