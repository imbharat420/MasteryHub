```js
const getCanvasBlob = (
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number,
): Promise<Blob | null> => new Promise(resolve => {
  canvas.toBlob(
    blob => resolve(blob),
    mimeType,
    quality,
  );
});

export default getCanvasBlob;
```