const table = require("table");

// Define the table data
const data = [  ["Name", "Age", "Location"],
  ["John Doe", "32", "New York"],
  ["Jane Doe", "30", "California"],
  ["Bob Smith", "28", "Texas"],
];

// Generate the table string using the table module
const tableString = table.table(data);

// Print the table to the console
console.log(tableString);