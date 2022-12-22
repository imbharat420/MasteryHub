import { useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMount = (effect: () => void) => useEffect(effect, []);

export default useMount;
