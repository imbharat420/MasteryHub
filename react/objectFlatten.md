```ts
import { TAnyObject } from 'types';

const objectFlatten = (object: TAnyObject) => {
  const result: TAnyObject = {};

  for (const i in object) {
    if ((typeof object[i]) === 'object' && !Array.isArray(object[i])) {
      const innerObject = objectFlatten(object[i]);
      // eslint-disable-next-line guard-for-in
      for (const j in innerObject) {
        result[j] = innerObject[j];
      }
    } else {
      result[i] = object[i];
    }
  }

  return result;
};

export default objectFlatten;
```