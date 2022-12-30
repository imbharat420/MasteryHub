Here is an example of how you can use the `useEffect` hook to create a custom hook that allows you to paste an image from the clipboard onto a canvas element using the `ctrl+v` keyboard shortcut:

Copy code

```jsx
import { useCallback, useEffect, useRef } from "react";

function usePasteImage(canvas) {
  const canvasRef = useRef(canvas);

  const handlePaste = useCallback(
    event => {
      const clipboardData = event.clipboardData;
      const items = clipboardData.items;

      // Check if there is an image in the clipboard
      if (items && items.length) {
        // Get the first image in the clipboard
        const image = items[0].getAsFile();
        if (image) {
          // Draw the image on the canvas
          const context = canvasRef.current.getContext("2d");
          const img = new Image();
          img.onload = () => {
            context.drawImage(img, 0, 0);
          };
          img.src = URL.createObjectURL(image);
        }
      }
    },
    [canvasRef]
  );

  useEffect(() => {
    // Add the paste event listener to the document
    document.addEventListener("paste", handlePaste);

    return () => {
      // Remove the paste event listener when the component unmounts
      document.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);
}

export default usePasteImage;
```

To use this hook, you can pass it a reference to the canvas element as an argument:

Copy code

```jsx
import usePasteImage from "./usePasteImage";

function MyComponent() {
  const canvasRef = useRef();

  usePasteImage(canvasRef.current);

  return <canvas ref={canvasRef} />;
}
```

Now, whenever you paste an image onto the canvas using the `ctrl+v` keyboard shortcut, it will be drawn on the canvas.
