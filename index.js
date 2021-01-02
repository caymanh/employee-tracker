const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");
const command = require("./action");

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

const viewEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log("Displaying All Employees...");
    console.table(res);
    start();
  });
};

const viewByDept = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewByManager = () => {
  connection.query("SELECT * from employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//Function to initialize the program
const start = () => {
  figlet("Employee Manager", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
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
        switch (answer.action) {
          case "View All Employees": //1
            viewEmployee();
            break;
          case "View All Employees By Department": //2
            viewByDept();
            break;
          case "View All Employees By Manager":
            viewByManager();
            break;
          case "Add Employee": //4
            addEmployee();
            break;
          case "Remove Employee":
            removeEmployee();
            break;
          case "Update Employee Role": //5
            updateRole();
            break;
          case "Update Employee Manager":
            updateManager();
            break;
          case "View All Roles": //3
            viewRole();
            break;
          case "Exit":
            console.log("You have quit the application. Thank you.");
            connection.end();
            break;
        }
      });
  });
};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
