import {
  useRef, useEffect, EffectCallback, DependencyList,
} from 'react';

const useUpdate = (effect: EffectCallback, deps: DependencyList) => {
  const didMountRef = useRef<boolean>(false);

  useEffect(() => {
    if (didMountRef.current) {
      const cleanup = effect();
      if (cleanup) {
        return cleanup;
      }
    }
    didMountRef.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdate;
