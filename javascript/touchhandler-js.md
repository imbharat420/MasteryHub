vanilla Javascript programme Game Control Touch Screen to move element

To create a game that allows the user to control an element on the screen using touch events, you can use the following approach:

1.  First, you will need to get a reference to the element that you want to move. You can do this using the `document.getElementById` method, or by using a query selector. For example:

Copy code

`const gameElement = document.getElementById("myGameElement");`

2.  Next, you can bind touch event listeners to the element to track the user's finger movement. You can use the `touchstart`, `touchmove`, and `touchend` events to get the starting and ending positions of the touch gesture.

Copy code

```js
let startX;
let startY;
let endX;
let endY;

gameElement.addEventListener("touchstart", event => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

gameElement.addEventListener("touchmove", event => {
  endX = event.touches[0].clientX;
  endY = event.touches[0].clientY;
});

gameElement.addEventListener("touchend", event => {
  // Calculate the distance the finger moved
  const distanceX = endX - startX;
  const distanceY = endY - startY;
});
```

3.  To move the element based on the finger movement, you can use the `style.left` and `style.top` properties to adjust the element's position. You can calculate the new position based on the distance the finger moved and the desired speed of movement.

Copy code

```ja
gameElement.style.left = `${gameElement.offsetLeft + distanceX}px`;
gameElement.style.top = `${gameElement.offsetTop + distanceY}px`;
```
