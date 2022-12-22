```js
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime/lite';

const canvasToBlobUrl = (canvas: HTMLCanvasElement): Promise<string> => new Promise(resolve => {
  canvas.toBlob(blob => blob && resolve(URL.createObjectURL(blob)));
});

export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob | null> => new Promise(resolve => {
  canvas.toBlob(blob => resolve(blob));
});

export const canvasToFile = (canvas: HTMLCanvasElement): Promise<File | null> => new Promise(resolve => {
  canvas.toBlob(blob => {
    if (!blob) return resolve(null);
    const imgName = `${uuidv4()}.${mime.getExtension(blob.type)}`;
    const file = new File([blob], imgName, { type: blob.type, lastModified: Date.now() });
    resolve(file);
  });
});

export default canvasToBlobUrl;

```