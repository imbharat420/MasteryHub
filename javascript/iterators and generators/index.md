## **iterators in javascript**

In JavaScript, an iterator is an object that defines a sequence of values, and a next() method that returns the next value in the sequence. Here is an example of a simple iterator that generates the sequence of numbers from 0 to 9:

Copy code

```js
function numberIterator() {
  let current = 0;
  return {
    next: function () {
      return { value: current++, done: current > 10 };
    },
  };
}

let iterator = numberIterator();
console.log(iterator.next().value); // 0
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // 5
console.log(iterator.next().value); // 6
console.log(iterator.next().value); // 7
console.log(iterator.next().value); // 8
console.log(iterator.next().value); // 9
```

JavaScript also has built-in iterators for many types of data, such as arrays and strings. For example, you can use the for-of loop to iterate over the elements of an array:

Copy code

`let numbers = [1, 2, 3, 4, 5];
for (let number of numbers) {
  console.log(number);
}`

You can also use the iterator protocol to create your own custom iterable objects by defining a method named `Symbol.iterator`

Copy code

```js
let myIterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return { value: i++, done: i > 3 };
      },
    };
  },
};
```

or you can use `[...iterable]` spread operator

Copy code

```js
console.log([...myIterable]); //[ 0, 1, 2 ]
```

It's important to note that not all objects are iterable by default, but you can make any object iterable by defining the `Symbol.iterator` method.

## **Generators in JavaScript **

In JavaScript, a generator is a special type of iterator that allows you to create a sequence of values using a function. A generator function is defined using the `function*` keyword, and it uses the `yield` keyword to return a value. Here is an example of a simple generator function that generates the sequence of numbers from 0 to 9:

Copy code

```js
function* numberGenerator() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}

let generator = numberGenerator();
console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
console.log(generator.next().value); // 4
console.log(generator.next().value); // 5
console.log(generator.next().value); // 6
console.log(generator.next().value); // 7
console.log(generator.next().value); // 8
console.log(generator.next().value); // 9
```

Another example is generating Fibonacci sequence

Copy code

```js
function* fibonacci() {
  let current = 0,
    next = 1;
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

let fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5
```

A generator function returns an iterator object, which can be used to iterate over the sequence of values returned by the `yield` statement. One of the main advantages of using generators is that they allow you to create and control infinite sequences, such as the Fibonacci sequence above.

Additionally, they allow you to pause and resume the execution of a function, which makes them useful for tasks such as asynchronous programming and lazy evaluation.

## **Async iterators (for await ... of) javascript**

In JavaScript, an async iterator is an object that defines a sequence of asynchronous values, and a next() method that returns a promise for the next value in the sequence. `for await...of` statement allows you to iterate over an async iterator and wait for each value to be resolved before moving on to the next one. Here is an example of an async iterator that generates the sequence of numbers from 0 to 9 with a delay of 1 second:

Copy code

```js
async function* numberAsyncIterator() {
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  for await (let number of numberAsyncIterator()) {
    console.log(number);
  }
})();
```

This code will log the numbers 0 to 9 with a delay of 1 second between each number. The `for await...of` statement waits for the promise returned by the next() method to be resolved before moving on to the next iteration.

Another example is using async iterator to read a file line by line

Copy code

```js
const fs = require("fs");
const readline = require("readline");

async function* readLines(file) {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    yield line;
  }
}

(async () => {
  for await (const line of readLines("file.txt")) {
    console.log(line);
  }
})();
```

It's important to note that `for await...of` statement is only available in ECMAScript 2017 and later versions.

Async Iterators allow you to work with asynchronous data sources, and it's useful when you have a large data set and you don't want to load it all in memory at once, or when you have a stream of data that needs to be processed in a sequential manner.

## **Using async generators to stream data in JavaScript**

An async generator is a special type of async iterator that allows you to create a sequence of asynchronous values using a function. An async generator function is defined using the `async function*` keyword, and it uses the `yield` keyword to return a promise for a value.

Here is an example of an async generator function that generates the sequence of numbers from 0 to 9 with a delay of 1 second:

Copy code

```js
async function* numberAsyncGenerator() {
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let generator = numberAsyncGenerator();
  while (true) {
    let { value, done } = await generator.next();
    if (done) {
      break;
    }
    console.log(value);
  }
})();
```

This code will log the numbers 0 to 9 with a delay of 1 second between each number. The `await generator.next()` statement waits for the promise returned by the next() method to be resolved before moving on to the next iteration.

Another example is streaming large files

Copy code

```js
const fs = require("fs");
const readline = require("readline");

async function* readLines(file) {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    yield line;
  }
}

(async () => {
  for await (const line of readLines("largefile.txt")) {
    console.log(line);
  }
})();
```

In this example, an async generator function `readLines` is used to read a large file line by line. As the file is read, each line is returned one at a time using the `yield` statement, which allows you to process the file without having to load the entire file into memory at once.

Async generators are useful when you need to work with a large amount of asynchronous data, such as large files or streams of data, and you want to process the data in chunks or in a sequential manner. They allow you to write code that is more memory-efficient and less prone to blocking, which makes them an ideal solution for streaming data in JavaScript.

## **Higher-order iterators in JavaScript**

In JavaScript, higher-order iterators are iterators that take other iterators as input, and return a new iterator that applies some kind of transformation or filtering to the input iterator. These are also known as "iterator adaptors" or "iterator combinators". Here are a couple of examples of higher-order iterators in JavaScript:

1.  `map` Iterator

Copy code

```js
function* map(iterator, fn) {
  for (const value of iterator) {
    yield fn(value);
  }
}

let iterator = map([1, 2, 3, 4, 5], x => x * 2);
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // 6
console.log(iterator.next().value); // 8
console.log(iterator.next().value); // 10
```

`map` iterator applies a function `fn` to each element of the input iterator. It is similar to `Array.prototype.map` method, but it can be used to map over any iterator.

2.  `filter` Iterator

Copy code

```js
function* filter(iterator, fn) {
  for (const value of iterator) {
    if (fn(value)) {
      yield value;
    }
  }
}

let iterator = filter([1, 2, 3, 4, 5], x => x % 2 === 0);
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 4
```

`filter` iterator applies a function `fn` to each element of the input iterator, and only yields the element if the function returns true. It is similar to `Array.prototype.filter` method, but it can be used to filter over any iterator.

You can also chain multiple higher-order iterators together to create more complex transformations. For example, you can use `map` and `filter` iterators together to double the values of even numbers in an array:

Copy code

```js
let iterator = filter(
  map([1, 2, 3, 4, 5], x => x * 2),
  x => x % 2 === 0
);
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // 8
```

Higher-order iterators make it easy to create reusable, composable code for working with sequences of data. They are particularly useful when working with large, complex data sets, where it can be difficult to keep track of the state of the data and the transformations that have been applied to it.

## **map for async iterators in JavaScript**

In JavaScript, the `map` function can also be used with async iterators to apply a transformation function to each value of the input iterator before it is returned. The `map` function for async iterators should return a new async iterator that applies the transformation function to each value of the input iterator. Here is an example of an `map` function for async iterators:

Copy code

```js
async function* map(iterator, fn) {
  for await (const value of iterator) {
    yield fn(value);
  }
}

let iterator = map([1, 2, 3, 4, 5], async x => x * 2);
console.log(await iterator.next().value); // 2
console.log(await iterator.next().value); // 4
console.log(await iterator.next().value); // 6
console.log(await iterator.next().value); // 8
console.log(await iterator.next().value); // 10
```

It's important to note that the transformation function passed to `map` should also be an `async function` so the returned promise can be resolved before yield the value.

Another example is an async iterator that applies a function to the value of each element of an async iterator with a delay of 1 second:

Copy code

```js
async function* numberAsyncIterator() {
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

let iterator = map(numberAsyncIterator(), async x => x * 2);
console.log(await iterator.next().value); // 0
console.log(await iterator.next().value); // 2
console.log(await iterator.next().value); // 4
console.log(await iterator.next().value); // 6
console.log(await iterator.next().value); // 8
```

As you can see, the `map` function for async iterators is similar to the `map` function for synchronous iterators, but it works with async iterators and async transformation functions. The `map` function for async iterators is a powerful tool for working with asynchronous data, it allows you to apply a transformation to each value of an async iterator in a sequential and memory-efficient way.
