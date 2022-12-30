Digital Rights Management (DRM) is a technology used to protect digital content from unauthorized access and use. To add DRM protection to content using JavaScript, you can use a library or service that provides DRM capabilities.

One option is to use the Encrypted Media Extensions (EME) API, which is a standardized API for DRM that is supported by most modern web browsers. With EME, you can use a Content Decryption Module (CDM) provided by a DRM vendor to encrypt and decrypt the content, and a License Server to manage the distribution of keys to authorized users.

Here's an example of how you could use the EME API to add DRM protection to a video using JavaScript:

Copy code

```jsx
const videoElement = document.getElementById("my-video");

// Set up the EME API to use the Widevine CDM
videoElement.setAttribute("src", "my-video.mpd");
videoElement.setAttribute("type", "application/dash+xml");

const mediaKeys = new MediaKeys("com.widevine.alpha");
videoElement.setMediaKeys(mediaKeys);

const licenseUrl = "https://example.com/get-license";
const mediaKeySession = mediaKeys.createSession();
mediaKeySession.addEventListener("message", event => {
  const licenseRequest = event.message;
  // Send the license request to the license server
  // and get the response
  fetch(licenseUrl, {
    method: "POST",
    body: licenseRequest,
  })
    .then(response => response.arrayBuffer())
    .then(licenseResponse => {
      // Send the license response to the CDM
      mediaKeySession.update(new Uint8Array(licenseResponse));
    });
});
```

This code sets up the `video` element to use the Widevine CDM and specifies a license server URL. When the video is played, the CDM sends a license request to the license server, which then responds with a license key that allows the CDM to decrypt the content.

Keep in mind that DRM is a complex topic and there are many different approaches and technologies that can be used to protect digital content. I recommend doing more research and consulting with a DRM vendor or specialist to determine the best solution for your needs.
