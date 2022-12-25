**Read all videos and folders from drive by API  in nodejs**
To read all the videos and folders from Google Drive using the Drive API in Node.js, you can use the drive.files.list method. This method returns a list of files matching the specified criteria, such as a specific MIME type or file name.

Here's an example of how you might use this method to retrieve all the videos and folders in your Google Drive:

```js
const { google } = require('googleapis');

async function getVideosAndFolders(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const response = await drive.files.list({
    q: "mimeType='video/mp4' or mimeType='application/vnd.google-apps.folder'",
    fields: 'nextPageToken, files(id, name, mimeType)'
  });
  const files = response.data.files;
  if (files.length) {
    console.log('Files:');
    files.map((file) => {
      console.log(`${file.name} (${file.mimeType})`);
    });
  } else {
    console.log('No files found.');
  }
}
```
This example uses a query to search for files with the MIME type video/mp4 (for videos) or application/vnd.google-apps.folder (for folders). The response object will contain a list of matching files, including their IDs, names, and MIME types.

Note that this example assumes that you have authenticated the client and stored the auth object. You can find more information about how to authenticate your requests to the Drive API in the Google Cloud Console documentation.




To read all the videos and folders from a shared drive using the Drive API in Node.js, you can use the drive.files.list method and specify the driveId and includeItemsFromAllDrives parameters.

Here's an example of how you might use this method to retrieve all the videos and folders in a shared drive:

```js
const { google } = require('googleapis');

async function getVideosAndFolders(auth, driveId) {
  const drive = google.drive({ version: 'v3', auth });
  const response = await drive.files.list({
    q: "mimeType='video/mp4' or mimeType='application/vnd.google-apps.folder'",
    driveId: driveId,
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    fields: 'nextPageToken, files(id, name, mimeType)'
  });
  const files = response.data.files;
  if (files.length) {
    console.log('Files:');
    files.map((file) => {
      console.log(`${file.name} (${file.mimeType})`);
    });
  } else {
    console.log('No files found.');
  }
}
```

This example uses a query to search for files with the MIME type video/mp4 (for videos) or application/vnd.google-apps.folder (for folders). The response object will contain a list of matching files, including their IDs, names, and MIME types.

Note that this example assumes that you have authenticated the client and stored the auth object, and that you have the ID of the shared drive you want to access (passed in as the driveId parameter). You can find more information about how to authenticate your requests to the Drive API and how to access shared drives in the Google Cloud Console documentation.