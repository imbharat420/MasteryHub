different between async/await and promises
Async/await and promises are both ways to handle asynchronous code in JavaScript.

Async/await is a more concise and readable syntax for working with promises. It allows you to write asynchronous code that looks like synchronous code, by using the await keyword to wait for a promise to resolve before moving on to the next line of code.

Here's an example of using async/await to make an HTTP request:

```js
async function makeRequest() {
  try {
    const response = await fetch('https://example.com');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```
Promises, on the other hand, are a pattern for working with asynchronous code that allows you to avoid callback hell and write cleaner, more organized code. A promise represents the result of an asynchronous operation, and can be in one of three states: pending, fulfilled, or rejected. You can use the .then() method to specify what should happen when the promise is fulfilled, and the .catch() method to handle any errors.

Here's the same example using promises:

```js
function makeRequest() {
  fetch('https://example.com')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
```
Overall, async/await can make your code more readable and easier to write, especially for complex asynchronous operations. However, both async/await and promises are useful tools for handling asynchronous code in JavaScript, and you can use either one depending on your needs and preferences.