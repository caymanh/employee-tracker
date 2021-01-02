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
    FOREIGN KEY (role_id) REFERENCES role (id),
);