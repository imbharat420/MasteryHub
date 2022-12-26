
Mongodb all examples with types

MongoDB is a popular NoSQL database that stores data in a flexible, JSON-like format called BSON. Here are some examples of common operations and types in MongoDB:

1.  Inserting data: This is used to add new documents to a collection. For example:

Copy code

`db.customers.insertOne({
   name: "John Smith",
   age: 30,
   address: {
      street: "123 Main St",
      city: "New York",
      state: "NY"
   }
});` 

This statement inserts a new document into the customers collection with the specified fields and values.

2.  Querying data: This is used to retrieve documents from a collection based on certain criteria. For example:

Copy code

`db.customers.find({ age: { $gt: 25 } });` 

This statement retrieves all documents from the customers collection where the age field is greater than 25.

3.  Updating data: This is used to modify existing documents in a collection. For example:

Copy code

`db.customers.updateOne(
   { name: "John Smith" },
   { $set: { age: 31 } }
);` 

This statement updates the age field of the document with the name "John Smith" to 31.

4.  Deleting data: This is used to remove documents from a collection. For example:

Copy code

`db.customers.deleteOne({ name: "John Smith" });` 

This statement deletes the document with the name "John Smith" from the customers collection.

5.  Data types: MongoDB supports a variety of data types, including strings, numbers, dates, arrays, and nested documents. Here are some examples of data types in MongoDB:

-   String: A sequence of characters, such as "John Smith".
-   Number: A numeric value, such as 31.
-   Date: A date and time value, such as ISODate("2022-12-25T00:00:00.000Z").
-   Array: A list of values, such as ["red", "green", "blue"].
-   Document: A nested structure of fields and values, such as { name: "John Smith", age: 31 }.

For example:

Copy code

`{
   name: "John Smith",
   age: 30,
   hobbies: ["reading", "hiking"],
   address: {
      street: "123 Main St",
      city: "New York",
      state: "NY"
   }
}` 

This document has a string field (name), a number field (age), an array field (hobbies), and a nested document field (address).