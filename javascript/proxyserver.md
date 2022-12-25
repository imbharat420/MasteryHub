**Make a proxy server to run from different country in nodejs**
To create a proxy server in Node.js that connects to a target server located in a different country, you can use the same approach as the one I described in my previous response. The http-proxy module allows you to specify the target server's URL as an option when creating the proxy, so you can simply use the desired target server's URL instead of ```http://localhost:3001```.

For example, if you want to create a proxy server that connects to a target server located in the United Kingdom, you can use the following code:

```js
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: 'http://example.com' });
});

server.listen(3000);
```


```js
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  proxy.web(req, res, {
    target: 'http://example.com',
    changeOrigin: true
  });
});

server.listen(3000);

```

This code creates a simple HTTP proxy server that listens on port 3000 and forwards all incoming requests to the target server at ```http://example.com```, which could be located in the United Kingdom or any other country.

Keep in mind that you may need to consider other factors, such as network latency and potential regulatory issues, when setting up a proxy server in a different country.