Web SQL Database is a deprecated specification that defines an API for storing data in a client-side database using SQL. It is no longer recommended for use, as it has been superseded by more modern APIs such as IndexedDB and the Web Storage API.

Here is an example of how to perform basic CRUD (create, read, update, delete) operations using Web SQL Database:

Copy code

```js
// Open a database connection
const db = openDatabase("mydatabase", "1.0", "My Database", 2 * 1024 * 1024);

// Create a table
db.transaction(function (tx) {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)"
  );
});

// Insert a row
db.transaction(function (tx) {
  tx.executeSql("INSERT INTO users (name) VALUES (?)", ["John"]);
});

// Select rows
db.transaction(function (tx) {
  tx.executeSql("SELECT * FROM users", [], function (tx, results) {
    console.log(results.rows);
  });
});

// Update a row
db.transaction(function (tx) {
  tx.executeSql("UPDATE users SET name = ? WHERE id = ?", ["Jane", 1]);
});

// Delete a row
db.transaction(function (tx) {
  tx.executeSql("DELETE FROM users WHERE id = ?", [1]);
});
```

In this example, a database connection is opened using the `openDatabase` function, and then a table is created using an SQL `CREATE TABLE` statement. Rows are inserted, selected, updated, and deleted using the `INSERT`, `SELECT`, `UPDATE`, and `DELETE` SQL statements, respectively. The `executeSql` function is used to execute these SQL statements and pass the results to a callback function.

Note that Web SQL Database is no longer recommended for use, as it has been superseded by more modern APIs such as IndexedDB and the Web Storage API. You should consider using one of these APIs instead.
