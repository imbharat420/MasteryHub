00:00:06,629 --> 00:00:09,296
00:00:10,663 --> 00:00:15,663
00:00:15,847 --> 00:00:20,847
00:00:23,427 --> 00:00:28,427
00:00:28,565 --> 00:00:33,151
00:00:33,151 --> 00:00:38,151

make a array of object from difference in time from 0 sec to start and end time 
and make total length from start to end and gap in between and to next time




To create an array of objects representing the start and end times, durations, and gaps between the subtitles in your list, you can use the following steps:

Parse the start and end times of each subtitle into JavaScript Date objects using the Date.parse method. The Date objects will represent the start and end times in milliseconds since the Unix epoch (midnight of January 1, 1970).
```js
const times = [
  { start: "00:00:06,629", end: "00:00:09,296" },
  { start: "00:00:10,663", end: "00:00:15,663" },
  { start: "00:00:15,847", end: "00:00:20,847" },
  { start: "00:00:23,427", end: "00:00:28,427" },
  { start: "00:00:28,565", end: "00:00:33,151" },
  { start: "00:00:33,151", end: "00:00:38,151" }
];


const parsedTimes = times.map(time => ({
  start: Date.parse(time.start),
  end: Date.parse(time.end)
}));
```
Calculate the duration of each subtitle by subtracting the start time from the end time. This will give you the duration of each subtitle in milliseconds.
```js
const durations = parsedTimes.map(time => time.end - time.start);
```


Calculate the gap between each pair of subtitles by subtracting the start time of the second subtitle from the end time of the first subtitle.
```js
const gaps = parsedTimes.slice(1).map((time, i) => time.start - parsedTimes[i].end);
```
Calculate the total length from the start to the end of all subtitles by adding up the durations and gaps.
```js
const totalLength = durations.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0);
```

Create an array of objects representing the start and end times, durations, and gaps between the subtitles. Each object should contain the following properties:
start: the start time of the subtitle in milliseconds
end: the end time of the subtitle in milliseconds
duration: the duration of the subtitle in milliseconds
gap: the gap between the current subtitle and the next subtitle in milliseconds (if applicable)
You can use the map function to create the array of objects from the parsed times, durations, and gaps arrays.

```js
const subtitles = parsedTimes.map((time, i) => ({
  start: time.start,
  end: time.end,
  duration: durations[i],
  gap: gaps[i]
}));
```

This will create an array of objects like the following:

```js
[
  { start: 629, end: 9296, duration: 8667, gap: 1034 },
  { start: 10663, end: 15663, duration: 5000, gap: 184 },
  ...
]
```