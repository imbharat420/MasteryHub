You can use the `DataTransfer` object to handle drag and drop events and get information about the files being dropped onto an element. You can then use this information to display the file names and types with icons.

Here's an example of how you might do this:

Copy code

```js
// Get the element that will be the target of the drag and drop
const dropTarget = document.getElementById("drop-target");

// Add the dragenter, dragover, and drop event listeners
dropTarget.addEventListener("dragenter", handleDragEnter);
dropTarget.addEventListener("dragover", handleDragOver);
dropTarget.addEventListener("drop", handleDrop);

// Handle the dragenter event
function handleDragEnter(event) {
  event.preventDefault();
  event.stopPropagation();
}

// Handle the dragover event
function handleDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
}

// Handle the drop event
function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();

  // Get the DataTransfer object from the event
  const dataTransfer = event.dataTransfer;

  // Get the file information from the DataTransfer object
  const files = dataTransfer.files;
  for (const file of files) {
    // Create an element to display the file name and type
    const fileElement = document.createElement("div");
    fileElement.classList.add("file");

    // Set the file name and type as the text content of the element
    fileElement.textContent = `${file.name} (${file.type})`;

    // Set the file type as the class of the element
    fileElement.classList.add(file.type.replace(/\//g, "-"));

    // Add the element to the drop target
    dropTarget.appendChild(fileElement);
  }
}
```

In this example, the code gets the element that will be the target of the drag and drop and adds the `dragenter`, `dragover`, and `drop` event listeners. The `handleDragEnter()` and `handleDragOver()` functions handle the `dragenter` and `dragover` events, respectively, and prevent the default behavior to allow the `drop` event to be triggered. The `handleDrop()` function handles the `drop` event and gets the `DataTransfer` object from the event. It then gets the file information from the `DataTransfer
