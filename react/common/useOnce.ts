import { useMemo } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useOnce = (factory: () => void) => useMemo(factory, []);

export default useOnce;
