//Here is a very basic program that demonstrates how to send and receive messages using RabbitMQ and Node.js:

const amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://localhost', (error, connection) => {
  if (error) {
    throw error;
  }

  // create a channel
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }

    // create a queue 
    const queue = 'hello';
    channel.assertQueue(queue, {
      durable: false
    });

    // send a message
    channel.sendToQueue(queue, Buffer.from('Hello, World!'));
    console.log(" [x] Sent 'Hello, World!'");
  });

  // close the connection after 1 second
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
});


// This program establishes a connection to a local RabbitMQ server, creates a queue called "hello", and sends a message with the body "Hello, World!" to that queue.

// To receive messages, you can use the following code:

const amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://localhost', (error, connection) => {
  if (error) {
    throw error;
  }

  // create a channel
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }

    // create a queue
    const queue = 'hello';
    channel.assertQueue(queue, {
      durable: false
    });

    // set up a consumer that will log each message that is received
    channel.consume(queue, (message) => {
      console.log(" [x] Received %s", message.content.toString());
    });
  });
});


// This program creates a consumer that listens for messages on the "hello" queue, and logs the body of each message that is received.

// I hope this helps! Let me know if you have any other questions.