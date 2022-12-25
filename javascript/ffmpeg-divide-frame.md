Ffmpeg.js for divide frames for editing 
Yes, ffmpeg.js is a JavaScript library that provides access to the FFmpeg video editing tool through the web browser. It allows you to perform various video editing tasks, including dividing a video into frames.

To divide a video into frames using ffmpeg.js, you can use the extractFrameToJpeg function, which takes a video file and an output path as input and extracts a single frame from the video at a specified time. You can then use a loop to extract multiple frames at different times.

Here is an example of how you might use this function to extract all the frames from a video and save them to a folder:

```js
const ffmpeg = require('ffmpeg.js');

const inputPath = 'path/to/input/video.mp4';
const outputFolder = 'path/to/output/folder';

// Get the duration of the video in seconds
const duration = ffmpeg.probe(inputPath).format.duration;

// Divide the duration by the number of frames you want to extract
const frameInterval = duration / numFrames;

for (let i = 0; i < numFrames; i++) {
  // Calculate the time at which to extract the frame
  const time = i * frameInterval;

  // Extract the frame and save it to the output folder
  ffmpeg.extractFrameToJpeg(inputPath, outputFolder, {
    start_time: time,
    duration: frameInterval
  });
}
```
This code will extract numFrames frames from the video, spaced evenly throughout the duration of the video. You can then use these frames for further editing or processing.