# Setup webrtc connection


**The Peer Connection API allows you to create real-time communication applications using WebRTC (Web Real-Time Communication). Here is an example of how to create a Peer Connection using JavaScript:**

1.  First, you will need to include the `adapter.js` library, which provides a compatibility layer for different browser implementations of WebRTC:

```js
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script> 
```
2.  Next, you can create a new Peer Connection using the `RTCPeerConnection` constructor:

```js
const peerConnection = new RTCPeerConnection({
  // Set up the connection configuration here
});
```

3.  To send data over the Peer Connection, you will need to add a media stream using the `addStream` method:



```js
const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
peerConnection.addStream(mediaStream);` 
```


4.  To receive data over the Peer Connection, you will need to set up an event listener for the `addstream` event:

```js
peerConnection.addEventListener('addstream', (event) => {
  // Add the received media stream to an HTML video element
  const videoElement = document.getElementById('video');
  videoElement.srcObject = event.stream;
});
```


5.  To establish a connection between two peers, you will need to exchange signaling data. You can do this using a signaling server, which allows the peers to send messages to each other through the server.

To set up a signaling server, you can use a library such as Socket.IO or a server-side language such as Node.js. Here is an example of how to use Socket.IO to send signaling data between two peers:

```js
// On the signaling server:
const io = require('socket.io')(8080);

io.on('connection', (socket) => {
  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });
  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });
});

// On the client side:
const socket = io('http://localhost:8080');

// Send an offer to the other peer
socket.emit('offer', offer);

// Listen for an answer from the other peer
socket.on('answer', (answer) => {
  peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});
```

6.  Once you have exchanged signaling data, you can create an offer and an answer to establish the Peer Connection. To create an offer, you can use the `createOffer` method of the `RTCPeerConnection` object:


```js
const offer = await peerConnection.createOffer();
peerConnection.setLocal
```


7.  Once you have created an offer, you can set it as the local description using the `setLocalDescription` method:
```js
peerConnection.setLocalDescription(offer);
```

8.  You can then send the offer to the other peer using the signaling server. On the other peer, you can receive the offer and set it as the remote description using the `setRemoteDescription` method:

```js
peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
```
9.  After setting the remote description, the other peer can create an answer using the `createAnswer` method:

```js
const answer = await peerConnection.createAnswer();
peerConnection.setLocalDescription(answer);
```

10.  The answer can then be sent back to the first peer using the signaling server. On the first peer, you can set the answer as the remote description using the `setRemoteDescription` method:

```js
peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
```

At this point, the Peer Connection should be established and you can start sending and receiving data over the connection.

You can find more information about the Peer Connection API in the WebRTC documentation: [https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)