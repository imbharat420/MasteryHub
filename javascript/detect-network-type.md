You can use the `navigator.connection` object to detect the network type (e.g. WiFi or cellular data) in the browser. This object is part of the Network Information API, which allows you to access information about the device's network connection.

Here's an example of how you can use the `navigator.connection` object to detect the network type:

Copy code

```js
const connection = navigator.connection;

if (connection) {
  console.log(connection.type); // Outputs the network type (e.g. "wifi", "cellular", etc.)
}
```

The `type` property of the `connection` object returns a string representing the network type. The possible values for this property are defined in the `effectiveType` enum, and include:

- `'slow-2g'`: A slow 2G connection.
- `'2g'`: A 2G connection.
- `'3g'`: A 3G connection.
- `'4g'`: A 4G connection.
- `'5g'`: A 5G connection.
- `'wifi'`: A WiFi connection.
- `'ethernet'`: An Ethernet connection.
- `'other'`: An unknown or unspecified connection type.

Note that the Network Information API is not supported in all browsers, so you should check for the presence of the `navigator.connection` object before using it.
