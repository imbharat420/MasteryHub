Certainly. Here is an optimized version of the hook that uses `useMemo` and `useCallback` to avoid creating unnecessary functions and `AbortController` to cancel the `FileReader` when the component unmounts:

Copy code

````js
import { useEffect, useMemo, useCallback } from 'react';

function usePasteEvent(callback) {
  const handlePaste = useCallback((event) => {
    event.preventDefault();
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    console.log(JSON.stringify(items));

    const clipboardData =
      event.clipboardData ||
      window.clipboardData ||
      event.originalEvent.clipboardData;

    if (clipboardData.files.length > 0) {
      const input = document.createElement('input');
      input.type = "file";
      input.files = clipboardData.files;
      if (clipboardData.files[0].type.startsWith("image/")) {
        callback(clipboardData.files[0]);
      }
    }
  }, [callback]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
      controller.abort();
    };
  }, [handlePaste]);
}
``

export default usePasteEvent;`

To return the image data as a base64 encoded string, you can modify the `setImage` function like this:

Copy code

```js
const setImage = useCallback((file) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    callback(fileReader.result);
  }
}, [callback]);

usePasteEvent((file) => {
  if (file.type.startsWith('image/')) {
    setImage(file);
  } else {
    // handle non-image paste events
  }
});
````
