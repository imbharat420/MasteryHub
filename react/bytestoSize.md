```js
export default function bytesToSize(bytes = 0, fractionDigits = 0) {
  if (bytes === 0) return { size: '0', sizeName: 'Bytes' };

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return {
    size: parseFloat((bytes / Math.pow(1024, i)).toFixed(fractionDigits)),
    sizeName: sizes[i],
  };
}

```