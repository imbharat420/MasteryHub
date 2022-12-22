/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useMountRef from '@picsart/rc/useMountRef';

const useUnMount = (effect: any, deps: any[] = []) => {
  const mountedRef = useMountRef();

  useEffect(() => () => {
    !mountedRef.current && effect();
  }, deps);
};

export default useUnMount;
