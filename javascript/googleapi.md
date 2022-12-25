**Make a file sending on drive by API  in nodejs**
To send a file to Google Drive using the Drive API in Node.js, you'll need to do the following:

Set up a project in the Google Cloud Console and enable the Drive API. You'll need to create credentials (e.g., an API key or OAuth client ID) to authenticate your requests to the API.

Install the googleapis library using npm install googleapis. This library provides access to the Google APIs, including the Drive API.

Authenticate your requests to the Drive API. There are several ways you can do this, but the most common is to use an OAuth 2.0 client ID and secret. You can find instructions for creating and using an OAuth client ID in the Google Cloud Console documentation.

Use the googleapis library to send a request to the Drive API to create a new file. The request should include the file's name, MIME type, and content. Here's an example of how you might do this:

```js
const { google } = require('googleapis');

async function sendFileToDrive(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: 'My File',
    mimeType: 'application/pdf'
  };
  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream('file.pdf')
  };
  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id'
  });
  console.log(`File ID: ${response.data.id}`);
}
```
This example assumes that you have authenticated the client and stored the auth object, and that you have a file called file.pdf in the same directory as your script. The response object will contain the ID of the newly created file.