```ts
import { useEffect } from 'react';

function useBeforeUnload(condition: boolean, text: string) {
  useEffect(() => {
    if (condition) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        const event = e || window.event;
        // For IE and Firefox prior to version 4
        if (event) {
          event.returnValue = text;
        }
        // For Safari
        return text;
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [condition, text]);
}

export default useBeforeUnload;
```