To make a vanilla JavaScript wave oscillator by voice, you can use the Web Audio API to generate and manipulate audio in the browser. The Web Audio API provides a number of audio-related functionality, including the ability to create and control oscillators, which are audio sources that produce a repeating waveform.

Here is an example of how to use the Web Audio API to create a wave oscillator and control it by voice:

Copy code

```js
/ Create an audio context
const audioContext = new AudioContext();

// Create a gain node to control the volume
const gainNode = audioContext.createGain();

// Create an oscillator
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Set the oscillator type to sine
oscillator.frequency.value = 440; // Set the oscillator frequency to 440 Hz

// Connect the oscillator to the gain node
oscillator.connect(gainNode);

// Connect the gain node to the audio context's destination
gainNode.connect(audioContext.destination);

// Start the oscillator
oscillator.start();

// Set up a voice recognition system to control the oscillator
const recognition = new webkitSpeechRecognition();
recognition.onresult = function(event) {
  // Get the user's spoken command
  const command = event.results[0][0].transcript;

  // Parse the command to control the oscillator
  if (command.includes('stop')) {
    oscillator.stop();
  } else if (command.includes('start')) {
    oscillator.start();
  } else if (command.includes('frequency')) {
    const frequency = parseInt(command.split(' ')[1]);
    oscillator.frequency.value = frequency;
  } else if (command.includes('volume')) {
    const volume = parseInt(command.split(' ')[1]) / 100;
    gainNode.gain.value = volume;
  }
};
recognition.start();
```

In this example, an audio context is created using the `AudioContext` constructor, and a gain node and an oscillator are created using the `createGain` and `createOscillator` methods, respectively. The oscillator is set to produce a sine wave and to have a frequency of 440 Hz. The oscillator is then connected to the gain node, and the gain node is connected to the audio context's destination, which allows the audio to be played.

A voice recognition system is then set up using the `webkitSpeechRecognition` constructor, and an event listener is added to listen for `result` events. The `result` event is fired when the user speaks a command, and the command is parsed to control the oscillator. In this example, the oscillator can be started or stopped, and its frequency and volume can be controlled using voice commands.

Note that the Web Audio API is a powerful and complex API, and this example only scratches the surface of what it can do. You can learn more about the Web Audio API on the Mozilla Developer Network or by consulting other online resources.
