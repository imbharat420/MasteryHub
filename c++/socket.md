Here is a simple example of a C++ program that uses the WebSocket++ library to connect to a WebSocket server and send a message when the connection is established:

Copy code

```cpp
#include <iostream>
#include <string>
#include <websocketpp/config/asio_client.hpp>
#include <websocketpp/client.hpp>

typedef websocketpp::client<websocketpp::config::asio_client> client;

using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;
using websocketpp::lib::bind;

// This function will be called when the WebSocket connection is established
void on_open(client * c, websocketpp::connection_hdl hdl) {
    std::cout << "Connection established!" << std::endl;

    // Send a message to the server
    c->send(hdl, "Hello from the client!", websocketpp::frame::opcode::text);
}

int main() {
    // Create a client object
    client c;

    // Set the on_open callback to the function we defined above
    c.set_open_handler(bind(&on_open,&c,::_1));

    // Connect to the WebSocket server
    websocketpp::lib::error_code ec;
    client::connection_ptr con = c.get_connection("ws://echo.websocket.org", ec);
    c.connect(con);

    // Run the asio loop to initiate the connection and send the message
    c.run();

    return 0;
}
```

This program will connect to the WebSocket echo server at "ws://echo.websocket.org", and send the message "Hello from the client!" when the connection is established. The server will then echo the message back to the client.

I hope this helps! Let me know if you have any questions or need further assistance.
