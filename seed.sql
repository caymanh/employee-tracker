DROP DATABASE IF EXISTS hr_DB;

CREATE database hr_DB;

USE hr_DB;

create table department (
    id int AUTO_INCREMENT not null,
    name VARCHAR (30) not null,
    primary key (id)
);

create TABLE role (
    id INT AUTO_INCREMENT not null,
    title VARCHAR (30) not null,
    salary decimal not null,
    department_id INT not null,
    PRIMARY KEY (id),
    foreign key (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id int AUTO_INCREMENT not null,
    first_name VARCHAR (30) not null,
    last_name VARCHAR (30) not null,
    role_id INT not null,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead',100000,1),('Salesperson',80000,1), ('Lead Engineer',150000,2),('Software Engineer',120000,2), ('Accountant',125000,3),('Legal Team Lead',250000,4),('Lawyer',190000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John','Doe',1,null),('Mike','Chan',2,null),('Ashley','Rodriguez',3,null),
('Kevin','Tupik',4,null),('Malia','Brown',1,null),('Sarah','Lourd',2,null),
('Tom','Allen',3,null),('Christian','Eckenrode',3,null);

SELECT department.id, department.name, role.title, role.id
FROM department INNER JOIN role ON (department.id = role.department_id);

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(manager.first_name," ", manager.last_name) as manager
FROM employee employee
LEFT JOIN employee manager  
	ON manager.id = employee.manager_id
INNER JOIN role 
	ON role.id = employee.role_id
INNER JOIN department
	ON department.id = role.department_id;