**How to create srt or webVTT files in javascript  by speech**
To create an SRT or WebVTT file in JavaScript, you can use the following steps:

First, you will need to transcribe the audio or video file into text. There are several ways to do this, including using a speech-to-text API or a library like p5.speech.

Once you have the transcript, you can create the SRT or WebVTT file by formatting the text into the appropriate format.

For SRT files:

Each subtitle should be numbered, starting at 1
Each subtitle should have a start and end time, in the format: HH:MM:SS,mmm (hours, minutes, seconds, milliseconds)
The start and end times should be separated by a " --> "
The subtitle text should be placed on a new line below the start and end times
For example:

```js
1
00:00:20,000 --> 00:00:24,400
Hello, world!

2
00:00:24,500 --> 00:00:27,800
This is a test.
For WebVTT files:
```

The file should start with the line "WEBVTT"
Each subtitle should have a start and end time, in the format: HH:MM:SS.mmm (hours, minutes, seconds, milliseconds)
The start and end times should be separated by a " --> "
The subtitle text should be placed on a new line below the start and end times
For example:

```js
WEBVTT

00:00:20.000 --> 00:00:24.400
Hello, world!

00:00:24.500 --> 00:00:27.800
```

This is a test.
To create the actual SRT or WebVTT file, you can use the fs module in Node.js to write the formatted text to a file. Here is an example of how you might do this:
```js
const fs = require('fs');

const srtFileText = `
1
00:00:20,000 --> 00:00:24,400
Hello, world!

2
00:00:24,500 --> 00:00:27,800
This is a test.

fs.writeFileSync('subtitles.srt', srtFileText);
```
I hope this helps! Let me know if you have any questions.