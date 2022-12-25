**Create react hook for implementation of time run function in time delay update**

Sure! Here's an example of a hook that you can use to implement a time-based function in a React component with a delay:

```js
import { useState, useEffect } from 'react';

function useTimeRun(callback, delay) {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(callback, delay);
      return () => clearInterval(interval);
    }
  }, [callback, delay, isRunning]);

  function start() {
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  return [isRunning, start, stop];
}
```
To use this hook, you can import it into your component and then call it inside your component's useEffect hook. For example:

```js
import { useTimeRun } from './useTimeRun';

function MyComponent() {
  const [count, setCount] = useState(0);
  const [isRunning, start, stop] = useTimeRun(() => setCount(count + 1), 1000);

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  return <div>{count}</div>;
}
```
This will cause the count state variable to be incremented every 1 second (1000 milliseconds). The useTimeRun hook returns an array with three values: a boolean indicating whether the timer is currently running, a start function that can be 