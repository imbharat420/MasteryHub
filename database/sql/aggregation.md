
Aggregation all examples

SQL provides several functions for performing aggregation operations on data, such as calculating sums, averages, counts, and maximum and minimum values. Here are some examples of common aggregation functions in SQL:

1.  SUM() function: This is used to calculate the sum of a set of values. For example:

Copy code

`SELECT SUM(Quantity) FROM Orders;` 

This statement calculates the sum of the Quantity column in the Orders table.

2.  AVG() function: This is used to calculate the average of a set of values. For example:

Copy code

`SELECT AVG(Price) FROM Products;` 

This statement calculates the average of the Price column in the Products table.

3.  COUNT() function: This is used to count the number of rows in a table or the number of non-NULL values in a column. For example:

Copy code

`SELECT COUNT(*) FROM Customers;` 

This statement counts the number of rows in the Customers table.

4.  MAX() function: This is used to find the maximum value in a set of values. For example:

Copy code

`SELECT MAX(Price) FROM Products;` 

This statement finds the maximum value in the Price column in the Products table.

5.  MIN() function: This is used to find the minimum value in a set of values. For example:

Copy code

`SELECT MIN(Price) FROM Products;` 

This statement finds the minimum value in the Price column in the Products table.

6.  GROUP BY clause: This is used to group the results of a SELECT statement by one or more columns and apply an aggregation function to each group. For example:

Copy code

`SELECT COUNT(*) as NumCustomers, Country
FROM Customers
GROUP BY Country;` 

This statement counts the number of customers for each country and groups the results by country.