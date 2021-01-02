const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");
const Query = require("./userQuery");

//create new user query object
const userQuery = new Query();

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
  connection.query(userQuery.viewEmployee, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewByDept = () => {
  connection.query(userQuery.viewByDept, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// const viewByManager = () => {
//   connection.query(userQuery.viewByManager, (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     start();
//   });
// };

const updateRole = () => {
  connection.query(userQuery.viewEmployee, (err, res) => {
    if (err) throw err;
    let employee = {};

    res.forEach((ele) => {
      let name = [ele.first_name, ele.last_name].join(" ");
      employee[name] = ele.id;
    });

    connection.query(userQuery.viewRoles, (err, res) => {
      if (err) throw err;
      let role = {};

      res.forEach((ele) => {
        role[ele.title] = ele.id;
      });

      let question = [
        {
          type: "list",
          message: "Select an employee",
          choices: Object.keys(employee),
          name: "employee",
        },
        {
          type: "list",
          message: "Select the employee's new role.",
          choices: Object.keys(role),
          name: "role",
        },
      ];

      let answer = (response) => {
        connection.query(
          userQuery.updateEmployee,
          [role[response.role], employee[response.employee]],
          (err, res) => {
            if (err) throw err;
            console.log(`Successfully updated ${response.employee}'s role to ${response.role}.`);
            start();
          }
        );
      };
      inquirer.prompt(question).then(answer);
    });
  });
};

const viewRoles = () => {
  connection.query(userQuery.viewRoles, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//Function to initialize the program
const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((answer) => {
      // based on their answer, call a relevant function
      switch (answer.action) {
        case "View All Employees":
          viewEmployee();
          break;
        case "View All Employees By Department":
          viewByDept();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Exit":
          figlet("Session Ended. Thank you.", function (err, data) {
            if (err) {
              console.log("Something went wrong...");
              console.dir(err);
              return;
            }
            console.log(data);
          });
          connection.end();
          break;
      }
    });
};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  figlet("Employee Manager", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    start();
  });
});
