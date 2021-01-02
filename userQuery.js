// const command = () => {
//   const showEmployee = 'SELECT * FROM employee';

//   const viewEmployee = () => {
//     connection.query(showEmployee, (err, results) => {
//       if (err) throw err;
//       console.log("");
//       console.table("All Employees", results);
//       start();
//     });
//   };
// }

// module.exports = command;

// const addEmployee = () => {
//   inquirer
//     .prompt([
//       {
//         name: "firstName",
//         type: "input",
//         message: "What is the employee's first name?",
//       },
//       {
//         name: "lastName",
//         type: "input",
//         message: "What is the employee's last name?",
//       },
//       {
//         name: "employeeRole",
//         type: "list",
//         message: "What is the employee's role?",
//         choices: [
//           "Sales Lead",
//           "Lead Engineer",
//           "Software Engineer",
//           "Account Manager",
//           "Accountant",
//           "Legal Team Lead",
//         ],
//       },
//       {
//         name: "employeeManager",
//         type: "list",
//         choices() {
//           const choiceArray = ["None"];
//           result.forEach(({ manager_name }) => {
//             choiceArray.push(manager_name);
//           });
//           return choiceArray;
//         },
//         message: "Who is the employee's manager?",
//       },
//     ])
//     .then(answer);
// };

class Query {
  constructor() {
    this.viewEmployee = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(manager.first_name," ", manager.last_name) as manager
    FROM employee employee
    LEFT JOIN employee manager  
      ON manager.id = employee.manager_id
    INNER JOIN role 
      ON role.id = employee.role_id
    INNER JOIN department
      ON department.id = role.department_id;
    `;

    this.viewByDept = `
    SELECT * FROM department;
    `;

    this.viewbyManager = `
    SELECT manager.id, CONCAT(manager.first_name," ", manager.last_name) as manager 
    FROM employee employee
    INNER JOIN employee manager
    ON manager.id = employee.manager_id;
    `;

    this.viewRoles = `SELECT * FROM role;
    `;
  }
}

module.exports = Query;