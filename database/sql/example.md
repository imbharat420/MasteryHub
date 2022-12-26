
All sql important examples

Here are some important examples of SQL queries that you may find useful:

1.  SELECT: This is used to retrieve data from a database. For example:

Copy code

`SELECT * FROM Customers;` 

This would retrieve all rows and columns from the Customers table.

2.  INSERT: This is used to add new rows to a table. For example:

Copy code

`INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');` 

This would insert a new row into the Customers table with the specified values.

3.  UPDATE: This is used to modify existing rows in a table. For example:

Copy code

`UPDATE Customers
SET ContactName = 'Alfred Schmidt', City = 'Hamburg'
WHERE CustomerID = 1;` 

This would update the ContactName and City columns for the row with a CustomerID of 1 in the Customers table.

4.  DELETE: This is used to delete rows from a table. For example:

Copy code

`DELETE FROM Customers
WHERE CustomerName = 'Alfreds Futterkiste';` 

This would delete the row from the Customers table where the CustomerName is 'Alfreds Futterkiste'.

5.  CREATE TABLE: This is used to create a new table in the database. For example:

Copy code

`CREATE TABLE Orders (
  OrderID int NOT NULL,
  CustomerID int,
  OrderDate date,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);` 

This would create a new table called Orders with the specified columns and a primary key and foreign key constraint.

6.  DROP TABLE: This is used to delete a table from the database. For example:

Copy code

`DROP TABLE Customers;` 

This would delete the Customers table from the database.

These are just a few examples of the many SQL commands that are available. I hope this helps! Let me know if you have any questions.