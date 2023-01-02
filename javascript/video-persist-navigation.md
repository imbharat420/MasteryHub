
To create a mini video player like YouTube in vanilla JavaScript that does not refresh the video element when navigating to a different page, you can use the `video` element in HTML and add controls such as play/pause buttons and a progress bar to allow the user to control the video playback.

Here is an example of a mini video player using the `video` element:

Copy code

```html
<video id="player" src="video.mp4"></video>
<button id="play-button" onclick="playVideo()">Play</button>
<button id="pause-button" onclick="pauseVideo()">Pause</button>
<input type="range" id="volume" min="0" max="1" step="0.1" onchange="setVolume()">
<input type="range" id="seek" min="0" max="100" step="1" onchange="setSeek()">
``` 

And here is the corresponding JavaScript code:

Copy code

```js
const player = document.getElementById('player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const volumeSlider = document.getElementById('volume');
const seekSlider = document.getElementById('seek');

function playVideo() {
  player.play();
}

function pauseVideo() {
  player.pause();
}

function setVolume() {
  player.volume = volumeSlider.value;
}

function setSeek() {
  player.currentTime = seekSlider.value * player.duration / 100;
}

player.addEventListener('timeupdate', function() {
  seekSlider.value = player.currentTime * 100 / player.duration;
});
```

To prevent the video from refreshing when navigating to a different page, you can use a technique called "persistent playback". This involves storing the current time and the state (playing or paused) of the video in a cookie or local storage, and restoring these values when the page is loaded.

Here is an example of how to implement persistent playback using local storage:

Copy code

```js
// Save the current time and state of the video in local storage
window.addEventListener('beforeunload', function() {
  localStorage.setItem('currentTime', player.currentTime);
  localStorage.setItem('paused', player.paused);
});

// Restore the current time and state of the video when the page is loaded
window.addEventListener('load', function() {
  player.currentTime = localStorage.getItem('currentTime') || 0;
  player.paused = localStorage.getItem('paused') || false;
});
``` 

This will cause the video to continue playing from the same point where it was left off, even when the user navigates to a different page and then comes back.

You can style the player using CSS to give it a similar appearance to the YouTube player.