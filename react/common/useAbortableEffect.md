```ts
import { DependencyList, useEffect, useRef } from 'react';

type AbortableEffectCallback = (status: { aborted: boolean }) => (void | (() => void | undefined));

const useAbortableEffect = (effect: AbortableEffectCallback, deps?: DependencyList) => {
  const status = useRef({ aborted: false });

  useEffect(() => {
    status.current.aborted = false;
    // pass the mutable object to the effect callback
    // store the returned value for cleanup
    const cleanUpFn = effect(status.current);
    return () => {
      // mutate the object to signal the consumer
      // this effect is cleaning up
      // eslint-disable-next-line react-hooks/exhaustive-deps
      status.current.aborted = true;
      if (typeof cleanUpFn === 'function') {
        // run the cleanup function
        cleanUpFn();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useAbortableEffect;
```