You can use the Geolocation API to get the current position of the device and track changes in the position. You can then use this information to detect when the position changes and resend the updated position to a server or save it to an array.

Here's an example of how you might use the Geolocation API to detect changes in the position and resend the updated position to a server:

Copy code

```js
// Check if the Geolocation API is supported
if ("geolocation" in navigator) {
  // Get the current position
  navigator.geolocation.getCurrentPosition(position => {
    sendPositionToServer(position);
  });

  // Start tracking the position and send updates to the server
  const watchId = navigator.geolocation.watchPosition(position => {
    sendPositionToServer(position);
  });

  // Stop tracking the position when the user leaves the page
  window.addEventListener("beforeunload", () => {
    navigator.geolocation.clearWatch(watchId);
  });
} else {
  console.warn("Geolocation API not supported");
}

// Send the position to the server
function sendPositionToServer(position) {
  const data = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  fetch("/position", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
```

In this example, the code checks if the Geolocation API is supported and then gets the current position using the `getCurrentPosition()` method. It also starts tracking the position using the `watchPosition()` method and sends updates to the server using the `fetch()` function. The `watchPosition()` method returns a watch ID that can be used to stop tracking the position later. The code stops tracking the position when the user leaves the page by using the `clearWatch()` method and passing in the watch ID.
