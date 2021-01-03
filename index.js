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

const viewDept = () => {
  connection.query(userQuery.viewDept, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewRoles = () => {
  connection.query(userQuery.viewRoles, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

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
          userQuery.updateRole,
          [role[response.role], employee[response.employee]],
          (err, res) => {
            if (err) throw err;
            console.log(
              `Successfully updated ${response.employee}'s role to ${response.role}.`
            );
            start();
          }
        );
      };
      inquirer.prompt(question).then(answer);
    });
  });
};

const addEmployee = () => {
  connection.query(userQuery.viewRoles, (err, res) => {
    if (err) throw err;
    let role = {};
    res.forEach((ele) => {
      role[ele.title] = ele.id;
    });

    connection.query(userQuery.viewEmployee + ";", (err, res) => {
      if (err) throw err;
      let employee = {
        none: null,
      };

      res.forEach((ele) => {
        let name = [ele.first_name, ele.last_name].join(" ");
        employee[name] = ele.id;
      });

      let question = [
        {
          type: "input",
          message: "Enter the employee's first name",
          name: "first_name",
        },
        {
          type: "input",
          message: "Enter the employee's last name",
          name: "last_name",
        },
        {
          type: "list",
          message: "Enter the employee's role",
          choices: Object.keys(role),
          name: "role",
        },
        {
          type: "list",
          message: "Enter the name of the employee's manager?",
          choices: Object.keys(employee),
          name: "manager",
        },
      ];

      let answer = (response) => {
        connection.query(
          userQuery.addEmployee,
          [
            {
              first_name: response.first_name,
              last_name: response.last_name,
              role_id: role[response.role],
              manager_id: employee[response.manager],
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(
              `Successfully added ${response.first_name} ${response.last_name} as an employee`
            );
            start();
          }
        );
      };
      inquirer.prompt(question).then(answer);
    });
  });
};

const addRole = () => {
  connection.query(userQuery.viewDept, (err, res) => {
    if (err) throw err;
    let dept = {};
    res.forEach((ele) => {
      dept[ele.name] = ele.id;
    });

    connection.query(userQuery.viewRoles, (err, res) => {
      if (err) throw err;
      let roles = res.map((ele) => ele.title.toLowerCase());
      let question = [
        {
          type: "input",
          message: "Enter the role that you would like to add",
          name: "role",
          validate: (value) => {
            if (roles.includes(value.toLowerCase()))
              return "The role already exists in our system. Please input another role.";
            else return true;
          },
        },
        {
          type: "input",
          message: "Enter the salary for this role.",
          name: "salary",
          validate: (value) => {
            if (isNaN(value)) return "Please enter a valid number.";
            else return true;
          },
        },
        {
          type: "list",
          message: "Enter the department this role belong to.",
          name: "department",
          choices: Object.keys(dept),
        },
      ];
      let answer = (response) => {
        connection.query(
          userQuery.addRole,
          [
            {
              title: response.role,
              salary: response.salary,
              department_id: dept[response.department],
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`Added ${response.role} in the system`);

            start();
          }
        );
      };
      inquirer.prompt(question).then(answer);
    });
  });
};

const addDepartment = () => {
  connection.query(userQuery.viewDept, (err, res) => {
    if (err) throw err;
    let dept = res.map((ele) => ele.name.toLowerCase());
    let question = [
      {
        type: "input",
        message: "Enter the department to be added?",
        name: "department",
        validate: (value) => {
          if (dept.includes(value.toLowerCase()))
            return "This department already exists in the system. Please enter another department.";
          else return true;
        },
      },
    ];
    let answer = (response) => {
      connection.query(
        userQuery.addDepartment,
        [
          {
            name: response.department,
          },
        ],
        (err, res) => {
          if (err) throw err;
          console.log(
            `Added ${response.department} as a department in the system.`
          );

          start();
        }
      );
    };
    inquirer.prompt(question).then(answer);
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
        "View All Departments",
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
        case "View All Departments":
          viewDept();
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
