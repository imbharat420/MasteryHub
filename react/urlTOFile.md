```ts
import fetchWithTimeout from './rc/fetchWithTimeout';

const urlToFile = async (url: string, filename: string, imageMimeType: string) => {
  const response = await fetchWithTimeout(url);
  const data = await response.arrayBuffer();
  return new File([data], filename, { type: imageMimeType });
};

export default urlToFile;
```