```js
import { isIOS } from 'react-device-detect';

import errorLogger from 'services/errorLogger';
import insertExifData from 'utils/formatters/insertExifData';

const createBlob = (dataUrl: string, type: string, width: number): { url: string; blob: Blob } => {
  let dataUrlCopy = dataUrl;
  if (type === 'image/jpeg') {
    dataUrlCopy = insertExifData(dataUrlCopy, width);
  }

  const imageData = atob(dataUrlCopy.split(',')[1]);
  // Use typed arrays to convert the binary data to a Blob
  const arrayBuffer = new ArrayBuffer(imageData.length);
  const view = new Uint8Array(arrayBuffer);

  for (let i = 0; i < imageData.length; i++) {
    // tslint:disable-next-line:no-bitwise
    view[i] = imageData.charCodeAt(i) & 0xff;
  }

  let blob;
  try {
    blob = new Blob([arrayBuffer], { type: isIOS ? type : 'application/octet-stream' });
  } catch (e) {
    errorLogger.trigger(e, 'error');
    const bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
    bb.append(arrayBuffer);
    blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
  }

  return {
    url: (window.webkitURL || window.URL).createObjectURL(blob),
    blob,
  };
};

export default createBlob;
```