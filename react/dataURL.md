```js
const dataURLtoFile = (dataurl: string, filename: string = ''): File => {
  const arr = dataurl.split(',');
  const mimeType = arr[0].match(/:(.*?);/);
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mimeType ? mimeType[1] : 'image/png' });
};

export default dataURLtoFile;
```