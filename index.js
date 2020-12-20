const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Port; 
  port: 3306,

  // Username
  user: "root",

  // Your Password
  password: "",
  database: "hr_DB",
});


