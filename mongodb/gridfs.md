Here is an example of how to use GridFS to stream a video file from a MongoDB database in Node.js:

Copy code

```js
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "mydatabase";

MongoClient.connect(url, { useNewUrlParser: true }, function (error, client) {
  if (error) {
    console.error(error);
    return;
  }

  const db = client.db(dbName);
  const bucket = new mongodb.GridFSBucket(db);

  // Set the Content-Type header for the response
  res.set("Content-Type", "video/mp4");

  // Create a readable stream from the video file in the database
  const videoStream = bucket.openDownloadStreamByName("video.mp4");

  // Pipe the readable stream to the response
  videoStream.pipe(res);
});
```

In this example, the MongoDB driver for Node.js is used to connect to a MongoDB database and create a `GridFSBucket` object. The `openDownloadStreamByName` method is used to create a readable stream for the video file with the name `video.mp4`, and the `pipe` method is used to pipe the stream to the response object. The `Content-Type` header is set to `video/mp4` using the `set` method of the response object.

This example assumes that you have already created a GridFS bucket in your MongoDB database and have uploaded the video file to the bucket using the GridFS API.

You can use a similar approach to stream an audio file from a MongoDB database using GridFS. Simply set the `Content-Type` header to the appropriate value for the audio file, such as `audio/mpeg`, and use the `openDownloadStreamByName` method to create a readable stream for the audio file.

Note that this is just a basic example of how to stream a video or audio file from a MongoDB database using GridFS. You may need to add additional error handling and other features to your code to make it more robust and production-ready. You can learn more about GridFS on the MongoDB documentation website or by consulting other online resources.
