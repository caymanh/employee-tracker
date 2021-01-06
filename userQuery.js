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

    this.viewDept = `
    SELECT * FROM department;
    `;

    this.viewRoles = `SELECT * FROM role;
    `;

    this.updateRole = `
    UPDATE employee SET role_id = ? WHERE id = ?`;

    this.addEmployee = `
    INSERT INTO employee SET ?`;

    this.addRole = `
    INSERT INTO role SET ?`;

    this.addDepartment = `
        INSERT INTO department SET ?`;
  }
}

module.exports = Query;
