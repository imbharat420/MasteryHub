A self join is a type of inner join, but it is used to join a table to itself, rather than to another table.

An inner join is a type of join that returns rows from both tables that satisfy the join condition. An inner join will only return rows where there is a match in both tables.

For example, consider the following `users` table:

| id  | name  | manager_id |
| :-: | :---: | :--------: |
|  1  | Alice |     3      |
|  2  |  Bob  |     3      |
|  3  |  Eve  |    NULL    |

To find the names of each user and their manager using an inner join, we can use the following query:|

```sql
SELECT A.name, B.name
FROM users A INNER JOIN users B
ON A.manager_id = B.id;
```

This would return the following result:

| name  | name |
| :---: | :--: |
|  Bob  | Eve  |
| Alice | Eve  |

To find the names of each user and their manager using a self join, we would use the same query, but the `users` table would be joined to itself:

```sql
SELECT A.name, B.name
FROM users A INNER JOIN users B
ON A.manager_id = B.id;
```

This would also return the following result:

| name  | name |
| :---: | :--: |
|  Bob  | Eve  |
| Alice | Eve  |
