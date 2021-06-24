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
          //   bidAuction();
        });
    });
  });
};



connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  createEmployee();
});