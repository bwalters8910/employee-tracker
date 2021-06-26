const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "KingBis3!99",
  database: "company_db",
});

const start = () => {
  inquirer
    .prompt({
      name: "input",
      type: "list",
      message: "Would you like to view, add, or update employees?",
      choices: [
        "COMPANY OVERVIEW",
        "VIEW EMPLOYEES",
        "ADD EMPLOYEE",
        "UPDATE EMPLOYEE ROLE",
        "VIEW DEPARTMENTS",
        "ADD DEPARTMENT",
        "VIEW ROLES",
        "ADD ROLE",
        "VIEW EMPLOYEES BY MANAGER",
        "EXIT",
      ],
    })
    .then((answer) => {
      if (answer.input === "ADD EMPLOYEE") {
        createEmployee();
      } else if (answer.input === "VIEW EMPLOYEES") {
        viewEmployees();
      } else if (answer.input === "UPDATE EMPLOYEE ROLE") {
        updateEmployeeRole();
      } else if (answer.input === "VIEW DEPARTMENTS") {
        viewDepartments();
      } else if (answer.input === "ADD DEPARTMENT") {
        createDepartment();
      } else if (answer.input === "VIEW ROLES") {
        viewRoles();
      } else if (answer.input === "ADD ROLE") {
        createRole();
      } else if (answer.input === "COMPANY OVERVIEW") {
        joinTables();
      } else if (answer.input === "VIEW EMPLOYEES BY MANAGER") {
        viewEmployeeByManager();
      } else {
        connection.end();
      }
    });
};

const joinTables = () => {
  connection.query('SELECT employee.first_name, employee.last_name, department.name AS department, role.title, role.salary FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id', (err, res) => {
    console.table(res);
    start();
})
};

const createEmployee = () => {
  connection.query('SELECT * from role', (err, res) => {
    connection.query('SELECT * from employee WHERE role_id = manager_id', (err, restwo) => {
      inquirer
        .prompt([
          {
            name: "firstname",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "lastname",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "roleId",
            type: "list",
            message: "What is the employee's role?",
            choices() {
              const choiceArray = [];
              res.forEach(({ id, title }) => {
                choiceArray.push({ name: title, value: id });
              });
              return choiceArray;
            },
          },
          {
            name: "managerId",
            type: "list",
            message: "Who is the employee's manager?",
            choices() {
              const choiceArray = [];
              restwo.forEach(({ id, first_name }) => {
                choiceArray.push({ name: first_name, value: id });
              });
              return choiceArray;
            },
          },
        ])
        .then((answer) => {
          console.log(answer);
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstname,
              last_name: answer.lastname,
              role_id: answer.roleId,
              manager_id: answer.managerId,
            },
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} employee inserted!\n`);
            }
          );
          start();
        });
    });
  });
};

const viewEmployees = () => {
  connection.query('SELECT employee.first_name, employee.last_name FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  })
};

const updateEmployeeRole = () => {
  connection.query("SELECT * from employee", (err, res) => {
    connection.query("SELECT * from role", (err, restwo) => {
      inquirer
        .prompt([
          {
            name: "choiceName",
            type: "list",
            message: "What employee would you like to update?",
            choices() {
              const choiceArray = [];
              res.forEach(({ id, first_name }) => {
                choiceArray.push({ name: first_name, value: id });
              });
              return choiceArray;
            },
          },
          {
            name: "choiceRole",
            type: "list",
            message: "What is their new role?",
            choices() {
              const choiceArray = [];
              restwo.forEach(({ id, title }) => {
                choiceArray.push({ name: title, value: id });
              });
              return choiceArray;
            },
          },
        ])
        .then((answer) => {
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: answer.choiceRole,
              },
              {
                id: answer.choiceName,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log("role changed");
            }
          );
          start();
        });
    });
  });
};

const createDepartment = () => {
  connection.query("SELECT * from department", (err, res) => {
        inquirer
          .prompt([
            {
              name: "deptname",
              type: "input",
              message: "What department would you like to add?",
            },
          ])
          .then((answer) => {
            console.log(answer);
            connection.query(
              "INSERT INTO department SET ?",
              {
                name: answer.deptname,
              },
              (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} department inserted!\n`);
              }
            );
            start();
          });
      }
    );

};

const viewDepartments = () => {
  connection.query("SELECT department.name FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const createRole = () => {
  connection.query("SELECT * from role", (err, res) => {
    connection.query("SELECT * from department", (err, res) => {
      inquirer
        .prompt([
          {
            name: "roleName",
            type: "input",
            message: "What role would you like to add?",
          },
          {
            name: "salary",
            type: "input",
            message: "What salary does this role have?",
          },
          {
            name: "deptId",
            type: "list",
            message: "What department does this role serve?",
            choices() {
              const choiceArray = [];
              res.forEach(({ id, name }) => {
                choiceArray.push({ name: name, value: id });
              });
              return choiceArray;
            },
          },
        ])
        .then((answer) => {
          console.log(answer);
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.roleName,
              salary: answer.salary,
              department_id: answer.deptId,
            },
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} role inserted!\n`);
            }
          );
          start();
        });
    });
  });
};

const viewRoles = () => {
  connection.query("SELECT role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewEmployeeByManager = () => {
  connection.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, res) => {
    inquirer.prompt([
      {
        name: "manager",
        type: "list",
        message: "What manager would you like to look up?",
        choices() {
          const choiceArray = [];
          res.forEach(({ id, first_name }) => {
            choiceArray.push({ name: first_name, value: id });
          });
          return choiceArray;
        },
      }
    ])
        .then((answer) => {
          console.log(answer);
          connection.query(
            "SELECT employee.first_name, employee.last_name FROM employee LEFT JOIN role on role.id = employee.role_id WHERE ?",
            [
              {
                manager_id: answer.manager,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.table(res);
            }
          );
          start();
        })
  });
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});