const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "KingBis3!99",
  database: "company_db",
});

const createEmployee = () => {
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
        name: "title",
        type: "input",
        message: "What is the employee's title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the employee's salary?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
        },
        (err, res) => {
          if (err) throw err;
        }
      );
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} employee inserted!\n`);
        }
      );
      //   bidAuction();
    });
};



connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  createEmployee();
});