```js
const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const startIndex = b64Data.indexOf('base64,') + 7;
  const b64 = b64Data.substr(startIndex);
  const byteCharacters = atob(b64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

export default b64toBlob;
```