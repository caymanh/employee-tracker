DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;
USE employee_DB;
create table department (
    id int AUTO_INCREMENT,
    name VARCHAR (30),
    primary key (id)
);
create TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR (30),
    salary decimal,
    department_id INT,
    PRIMARY KEY (id),
    foreign key (department_id) REFERENCES department (id)
);
CREATE TABLE employee (
    id int AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);