import { useState, useCallback } from 'react';

import Logger from 'services/logger';
import storageApi from 'services/storage';

function useLocalStorage(prefix: string, key: string, initialValue: any, withConsole: boolean = true) {
  const [storedValue, setStoredValue] = useState(() => storageApi.getSync(prefix, key) ?? initialValue);

  const setValue = useCallback((value: any) => {
    setStoredValue(value);
    try {
      storageApi.putSync(prefix, key, value);
    } catch (e) {
      Logger.error(e as string, withConsole);
    }
  }, [key, prefix, withConsole]);

  return [storedValue, setValue];
}

export default useLocalStorage;