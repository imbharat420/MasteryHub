To create a JavaScript program for speech recognition, you will need to use the Web Speech API, which is a browser-based API that allows developers to incorporate speech recognition and synthesis into web applications.

Here is an example of a simple JavaScript program that uses the Web Speech API to recognize speech and display the transcribed text in a textarea element:

Copy code

```js
const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("");

  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});

recognition.addEventListener("end", recognition.start);

recognition.start();
```

In this example, the `SpeechRecognition` constructor is used to create a new speech recognition object, and the `interimResults` property is set to `true` to enable the display of intermediate results. The `result` event is then listened for, and the `transcript` is retrieved and displayed in a `p` element. When the results are final, a new `p` element is created and appended to the `words` container element. The `end` event is also listened for, and the `start` method is called to restart the speech recognition when the previous recognition session ends.

This is just one example of how you can use the Web Speech API to create a speech recognition program in JavaScript. You can customize the behavior and appearance of the program to suit your needs. For example, you could add a button to start and stop the speech recognition, or you could display the transcribed text in a textarea element to allow editing.
