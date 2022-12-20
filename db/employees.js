const db = require("./connection");

const inquirer = require("inquirer");
const { viewRoles } = require("./role");

async function viewAllEmployees() {
  try {
    const employees = await db.query("SELECT * FROM employee");
    return employees;
  } catch (err) {
    console.log(err);
  }
}

async function addEmployee() {
  try {
    const roles = await viewRoles();
    const { firstName, lastName, role } = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: `What is the employee's first name?`,
      },
      {
        type: "input",
        name: "lastName",
        message: `What is the employee's last name?`,
      },
      {
        type: "list",
        name: "role",
        message: `What is the employee's role?`,
        choices: roles.map((role) => {
          return {
            value: role.id,
            name: role.title,
          };
        }),
      },
    ]);

    await db.query(
      `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${firstName}", "${lastName}", ${role})`
    );
    const newEmployees = await viewAllEmployees();

    return newEmployees;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  viewAllEmployees,
  addEmployee,
};
