```jsx
import { useCallback, useEffect, useState } from 'react';

function useNetwork() {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);

  const updateNetwork = useCallback(() => {
    setNetwork(window.navigator.onLine);
  }, []);

  useEffect(() => {
    window.addEventListener('offline', updateNetwork);
    window.addEventListener('online', updateNetwork);

    return () => {
      window.removeEventListener('offline', updateNetwork);
      window.removeEventListener('online', updateNetwork);
    };
  }, [updateNetwork]);

  return isOnline;
}
export default useNetwork;
```