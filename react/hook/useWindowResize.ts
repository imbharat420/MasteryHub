import { useEffect } from 'react';

const useWindowResize = (resizeEffect: () => void, deps?: ReadonlyArray<any>) => {
  useEffect(() => {
    window.addEventListener('resize', resizeEffect);

    return () => window.removeEventListener('resize', resizeEffect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useWindowResize;
