Here is a list of the main steps involved in establishing a WebRTC connection between two peers:

1. The initiating peer creates an RTCPeerConnection object and generates an SDP offer, which includes information about their media capabilities and network configuration.

2. The initiating peer sends the SDP offer to the receiving peer.

3. The receiving peer creates an RTCPeerConnection object and generates an SDP answer, which includes information about their media capabilities and network configuration. The SDP answer also includes any modifications or additional information required to establish a connection.

4. The receiving peer sends the SDP answer back to the initiating peer.

5. The initiating peer and receiving peer exchange ICE (Interactive Connectivity Establishment) candidates, which are used to establish a direct connection between the two peers.

6. Once a connection has been established, the two peers can exchange media streams and data using the RTCPeerConnection object.

7. If either peer wants to change the configuration of the connection (e.g., add or remove a media stream), they can send an updated SDP offer and answer to negotiate the changes.

8. When the connection is no longer needed, either peer can close the RTCPeerConnection object to end the connection.

Note: This is a high-level overview of the WebRTC flow. There are additional details and considerations involved in implementing a WebRTC connection in a real application. You can refer to the WebRTC documentation provided by the World Wide Web Consortium (W3C) and the Mozilla Developer Network for more information.