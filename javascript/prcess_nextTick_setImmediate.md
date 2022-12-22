give example for both in nodejs
process.nextTick(callback); , setImmediate(callback);
In Node.js, process.nextTick() and setImmediate() are both methods that can be used to schedule a callback function to be executed asynchronously. However, they differ in when the callback is executed relative to other I/O events.

Here is an example of how you might use process.nextTick() in Node.js:

```js
process.nextTick(() => {
  console.log('This callback will be executed after the current event loop iteration is completed.');
});
```
process.nextTick() schedules the callback to be executed at the end of the current event loop iteration. This means that the callback will be executed after any I/O events that have been scheduled for the current iteration are completed.


Here is an example of how you might use setImmediate() in Node.js:
```js
setImmediate(() => {
  console.log('This callback will be executed in the next event loop iteration.');
});
```

setImmediate() schedules the callback to be executed in the next event loop iteration. This means that the callback will be executed after any I/O events that are scheduled for the current iteration, as well as any other callbacks scheduled using process.nextTick().

Both process.nextTick() and setImmediate() can be useful for scheduling asynchronous tasks in Node.js, but they should be used appropriately depending on when you want the callback to be executed relative to other I/O events.