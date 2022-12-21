**react portal modal with remove listener when blur event**


In React, a portal is a way to render a component outside of the parent component's DOM tree. This can be useful for creating modals or other UI elements that should be displayed on top of the main content.

To create a modal using a portal in React, you can use the createPortal method from the react-dom package. Here is an example of how you can create a modal using a portal in React:

```js
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  // Create the modal element
  const modal = document.createElement('div');
  modal.className = 'modal';

  // Add the modal to the body element
  document.body.appendChild(modal);

  // Remove the modal from the DOM when the component unmounts
  useEffect(() => {
    return () => {
      document.body.removeChild(modal);
    };
  }, [modal]);

  return isOpen ? createPortal(<div>Modal content</div>, modal) : null;
}
```
To add a blur event listener to the modal, you can use the useEffect hook to add an event listener to the window object when the modal is open, and remove it when the modal is closed. Here is an example of how you can do this:

```js
import { useEffect } from 'react';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  // Create the modal element
  const modal = document.createElement('div');
  modal.className = 'modal';

  // Add the modal to the body element
  document.body.appendChild(modal);

  // Remove the modal from the DOM when the component unmounts
  useEffect(() => {
    return () => {
      document.body.removeChild(modal);
    };
  }, [modal]);

  // Add a blur event listener when the modal is open
  useEffect(() => {
    if (isOpen) {
      const handleBlur = () => {
        setIsOpen(false);
      };
      window.addEventListener('blur', handleBlur);

      // Remove the event listener when the modal is closed
      return () => {
        window.removeEventListener('blur', handleBlur);
      };
    }
  }, [isOpen]);

  return isOpen ? createPortal(<div>Modal content</div>, modal) : null;
}
```
I hope this helps! Let me know if you have any other questions.