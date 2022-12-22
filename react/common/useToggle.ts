import { useState, useCallback } from 'react';

const useToggle = (defaultValue: boolean): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(defaultValue);

  const toggle = useCallback(() => setState(prev => !prev), []);

  return [state, toggle];
};

export default useToggle;
