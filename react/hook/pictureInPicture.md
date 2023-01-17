Here is an example of a custom hook that allows you to toggle Picture-in-Picture mode for a given video element:

Copy code

```jsx
import { useState, useEffect } from "react";

function usePictureInPicture(videoRef) {
  const [pictureInPictureEnabled, setPictureInPictureEnabled] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    function onEnterPictureInPicture() {
      setPictureInPictureEnabled(true);
    }

    function onLeavePictureInPicture() {
      setPictureInPictureEnabled(false);
    }

    video.addEventListener("enterpictureinpicture", onEnterPictureInPicture);
    video.addEventListener("leavepictureinpicture", onLeavePictureInPicture);

    return () => {
      video.removeEventListener(
        "enterpictureinpicture",
        onEnterPictureInPicture
      );
      video.removeEventListener(
        "leavepictureinpicture",
        onLeavePictureInPicture
      );
    };
  }, [videoRef]);

  function togglePictureInPicture() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (pictureInPictureEnabled) {
      document.exitPictureInPicture();
    } else {
      video.requestPictureInPicture();
    }
  }

  return [pictureInPictureEnabled, togglePictureInPicture];
}
```

You can then use this hook in your component like this:

Copy code

```jsx
const videoRef = useRef(null);
const [pictureInPictureEnabled, togglePictureInPicture] =
  usePictureInPicture(videoRef);
```

And add the video element in your component

Copy code

```jsx
<video ref={videoRef}>
  <source src="your-video-source" type="video/mp4" />
</video>
```

You can then use the `pictureInPictureEnabled` state to conditionally render a button to toggle Picture-in-Picture mode, and the `togglePictureInPicture` function as the click handler for that button.

Copy code

```jsx
<button onClick={togglePictureInPicture}>
  {pictureInPictureEnabled
    ? "Exit Picture-in-Picture"
    : "Enter Picture-in-Picture"}
</button>
```

Note: This feature is only available on some modern browsers, and it requires https. It's also important to note that the Picture-in-Picture API is an experimental technology, and its implementation is subject to change.
