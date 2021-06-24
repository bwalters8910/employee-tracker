DROP DATABASE IF exists company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 4) NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brian", "Walters", 1, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 2, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ronda", "Jones", 3, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter", 4, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sally", "Susan", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jimmy", "Johnson", 7, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bobbie", "Bovine", 8, 8);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Publicist", 85000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Hiring Manager", 100000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("VP of Analytics", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("VP of Sales", 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("VP of Marketing", 200000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("VP of Human Relations", 200000, 4);

INSERT INTO department (name)
VALUES ("Analytics");
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Human Relations");