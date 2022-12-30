IndexedDB is a web platform API that provides a client-side NoSQL database for storing and retrieving data in a web app. It allows web apps to store large amounts of data locally, without the need for server-side storage.

Here is an example of how to perform basic CRUD (create, read, update, delete) operations using IndexedDB:

Copy code

```js
// Open a database connection
const request = window.indexedDB.open("mydatabase", 1);

request.onerror = function (event) {
  console.error("Database error:", event.target.error);
};

request.onsuccess = function (event) {
  const db = event.target.result;

  // Create an object store
  const objectStore = db.createObjectStore("users", { keyPath: "id" });

  // Insert a row
  const transaction = objectStore.transaction(["users"], "readwrite");
  const request = transaction.objectStore("users").add({ id: 1, name: "John" });

  // Select rows
  const request = objectStore.getAll();
  request.onsuccess = function (event) {
    console.log(event.target.result);
  };

  // Update a row
  const request = objectStore.get(1);
  request.onsuccess = function (event) {
    const user = event.target.result;
    user.name = "Jane";
    objectStore.put(user);
  };

  // Delete a row
  objectStore.delete(1);
};
```

In this example, a database connection is opened using the `open` method of the `indexedDB` object. An object store is created using the `createObjectStore` method, and rows are inserted, selected, updated, and deleted using the `add`, `getAll`, `get`, `put`, and `delete` methods, respectively.

Note that IndexedDB is a powerful and flexible API that provides many other features in addition to the basic CRUD operations shown in this example. You can learn more about IndexedDB on the Mozilla Developer Network or by consulting other online resources.
