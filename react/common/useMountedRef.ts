import { useRef } from 'react';
import useMount from '@picsart/rc/useMount';

const useMountedRef = () => {
  const ref = useRef(true);

  useMount(() => () => ref.current = false);
  return ref;
};

export default useMountedRef;
