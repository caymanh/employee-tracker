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

const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Exit",
      ],
    })
    .then((answer) => {
      // based on their answer, call a relevant function
      switch (answer) {
        case "View All Employees":
          viewEmployee();
        case "View All Employees By Department":
          viewByDept();
        case "View All Employees By Manager":
          viewByManager();
        case "Add Employee":
          addEmployee();
        case "Remove Employee":
          removeEmployee();
        case "Updated Employee Role":
          updateRole();
        case "Update Employee Manager":
          updateManager();
        case "View All Roles":
          viewRole();
        default:
          connection.end();
      }
    });
};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
