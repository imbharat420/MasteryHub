Here is an example of how you can use the `useEffect` hook to create a custom hook that allows you to trigger different functions using keyboard shortcuts in a React application:

Copy code

```jsx
import { useEffect, useRef } from "react";

function useKeyboardShortcuts(shortcuts) {
  const ref = useRef();

  useEffect(() => {
    const handleKeyDown = event => {
      if (ref.current && ref.current.contains(event.target)) {
        // Check if the event matches any of the specified shortcuts
        const shortcut = Object.keys(shortcuts).find(key => key === event.code);
        if (shortcut) {
          // Execute the corresponding function
          shortcuts[shortcut]();
        }
      }
    };

    // Add the keydown event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the keydown event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);

  return ref;
}

export default useKeyboardShortcuts;
```

To use this hook, you can pass it an object with the keyboard shortcuts and their corresponding functions as the argument:

Copy code

```jsx
import useKeyboardShortcuts from "./useKeyboardShortcuts";

function MyComponent() {
  const ref = useKeyboardShortcuts({
    KeyZ: () => console.log("Undo"),
    KeyR: () => console.log("Redo"),
    KeyB: () => console.log("Bold"),
    KeyC: () => console.log("Copy"),
    KeyU: () => console.log("Underline"),
  });

  return <div ref={ref}>Press a shortcut key</div>;
}
```

Now, when you press one of the specified shortcut keys within the div element, the corresponding function will be executed.
