```ts
const readDropDownFile = (file: File | Blob): Promise<string> => new Promise(resolve => {
  const reader = new FileReader();

  reader.onload = evn => {
    if (!evn.target || !evn.target.result) {
      return resolve('');
    }

    return resolve(evn.target.result as string);
  };

  reader.readAsDataURL(file);
});

export default readDropDownFile;
```