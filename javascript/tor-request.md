**Nodejs programme for run Tor network for web Crawling which is vps friendly**
To use the TOR network for web crawling in a Node.js program, you can use the tor-request library. This library allows you to send HTTP requests through the TOR network using Node.js.

Here is an example of how you can use tor-request to send a simple GET request to a website using the TOR network:

```js
const tor = require('tor-request');

tor.request('https://example.com', (err, res, body) => {
  if (!err && res.statusCode == 200) {
    console.log(body);
  }
});
```

To use tor-request, you will need to have the TOR network installed and running on your system. You can install TOR by following the instructions for your operating system on the TOR Project website: https://www.torproject.org/download/

It's important to note that using the TOR network for web crawling may not always be the best choice, as it can be slower and less reliable than other options. Additionally, using the TOR network can raise red flags with website administrators and may result in your IP address being blocked or banned.

Finally, it's worth noting that web crawling can place a heavy load on servers, and it is important to respect the terms of service of the websites you are crawling. If you are planning to do a lot of web crawling, it may be a good idea to use a virtual private server (VPS) or a dedicated server to ensure that you have sufficient resources and to minimize the impact on other users.