import { useEffect,useRef } from 'react';

const useMount = (effect: () => void) => useEffect(effect, []);

const useMountRef = () => {
  const mountRef = useRef(true);
  useMount(() => () => mountRef.current = false);
  return mountRef;
};

const useMountedRef = () => {
  const ref = useRef(true);
  useMount(() => () => ref.current = false);
  return ref;
};

const useUnMount = (effect: any, deps: any[] = []) => {
  const mountedRef = useMountRef();
  useEffect(() => () => {
    !mountedRef.current && effect();
  }, deps);
};

