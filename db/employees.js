const db = require("./connection");

const inquirer = require("inquirer");
const { viewRoles } = require("./role");

async function viewAllEmployees() {
  try {
    const employees = await db.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id"
    );
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
      `INSERT into employee (first_name, last_name, role_id) VALUES ("${firstName}", "${lastName}", "${role}")`
    );
    const newEmployees = await viewAllEmployees();
    return newEmployees;
  } catch (err) {
    console.log(err);
  }
}

async function updateEmployee() {
  try {
    const employeesFromDb = await viewAllEmployees();
    const roles = await viewRoles();
    const { employee, first_name, last_name, newRole } = await inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: employeesFromDb.map((e) => {
          return {
            name: `${e.first_name}, ${e.last_name}`,
            value: e.id,
          };
        }),
      },
      {
        type: "list",
        name: "newRole",
        message: `Select the employee's new role?`,
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
      },
    ]);

    await db.query(
      `UPDATE employee SET role_id = ${newRole} WHERE role_id = ${employee}`
    );
    const updatedEmployee = await viewAllEmployees();
    return await viewAllEmployees();
  } catch (err) {
    console.log(err);
  }
}

async function deleteEmployee() {
  try {
    const allEmployees = await viewAllEmployees();
    const { id } = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee would you like to delete?",
        name: "id",
        choices: allEmployees.map((e) => {
          return {
            name: `${e.first_name}, ${e.last_name}`,
            value: e.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM employee Where id = ${id}`);

    return await viewAllEmployees();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
