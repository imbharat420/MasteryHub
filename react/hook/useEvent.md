Here's an example of a custom React hook that allows you to handle event bubbling, capturing, and propagation:

```jsx
import { useRef, useCallback } from "react";

function useEvent(eventType, callback, capture = false) {
  const callbackRef = useRef(callback);
  const captureRef = useRef(capture);

  // Update the callback and capture values if they change
  useEffect(() => {
    callbackRef.current = callback;
    captureRef.current = capture;
  }, [callback, capture]);

  const handleEvent = useCallback(event => {
    const currentCallback = callbackRef.current;
    const currentCapture = captureRef.current;

    if (currentCallback) {
      currentCallback(event);
    }
  }, []);

  useEffect(() => {
    if (eventType) {
      document.addEventListener(eventType, handleEvent, capture);
    }

    return () => {
      if (eventType) {
        document.removeEventListener(eventType, handleEvent, capture);
      }
    };
  }, [eventType, handleEvent, capture]);
}
```

You can use this hook in your React component like this:

```jsx
function MyComponent() {
  useEvent(
    "click",
    event => {
      console.log("Clicked: ", event.target.tagName);
    },
    true
  );

  return <div>Click me</div>;
}
```

In this example, the hook is listening for the "click" event on the whole document and when the event is captured it logs the tag name of the element that was clicked.

The hook takes three arguments:

- The `eventType` is a string indicating which event to listen for.
- The `callback` is the function that will be called when the event is fired.
- The `capture` is a boolean indicating whether the event should be captured or bubbled.

It worth noting that, the hook will work with any valid DOM event, like 'click', 'mousemove' and so on.
