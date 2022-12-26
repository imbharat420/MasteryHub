
There are several libraries that you can use to create QR codes in JavaScript:

1.  QRious: QRious is a lightweight library that allows you to create QR codes using the canvas element. It has a simple API and supports customization of the QR code color and size.

Example:

```js
const QRious = require('qrious');

const qr = new QRious({
  element: document.getElementById('qr'),
  value: 'https://www.example.com',
});
```

2.  QRcode.js: QRcode.js is a library that allows you to create QR codes using the canvas element or SVG. It has a simple API and supports customization of the QR code color, size, and error correction level.

Example:

```js
const QRCode = require('qrcode');

const qr = QRCode.create('https://www.example.com', {
  type: 'svg',
  width: 256,
  height: 256,
  color: {
    dark: '#000000',
    light: '#ffffff',
  },
});
document.getElementById('qr').innerHTML = qr;` 
```

3.  qrcode-generator: qrcode-generator is a library that allows you to create QR codes using the canvas element or SVG. It has a simple API and supports customization of the QR code size, error correction level, and background color.

Example:

```js
const qrcode = require('qrcode-generator');

const qr = qrcode(4, 'L');
qr.addData('https://www.example.com');
qr.make();
document.getElementById('qr').innerHTML = qr.createSvgTag();
```
You can choose the library that best fits your needs and use it to create QR codes in your JavaScript application.