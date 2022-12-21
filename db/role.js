const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllDepartments } = require("./departments");

async function viewRoles() {
  try {
    const role = await db.query(
      "SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.id = department.id"
    );
    return role;
  } catch (err) {
    console.log(err);
  }
}

async function addRole() {
  try {
    const department = await viewAllDepartments();
    const { title, salary, department_id } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: `What is the title of the new role?`,
      },
      {
        type: "list",
        name: "department_id",
        message: `To what department does this role belong?`,
        choices: department.map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        }),
      },
      {
        type: "input",
        name: "salary",
        message: `What is the annual salary for this role?`,
      },
    ]);

    await db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`
    );
    const newRole = await viewRoles();

    return newRole;
  } catch (err) {
    console.log(err);
  }
}
async function deleteARole() {
  try {
    const allRoles = await viewRoles();
    const { id } = await inquirer.prompt([
      {
        type: "list",
        message: "Which role would you like to delete?",
        name: "id",
        choices: allRoles.map((r) => {
          return {
            name: r.title,
            value: r.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM role Where id = ${id}`);

    return await viewRoles();
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  viewRoles,
  addRole,
  deleteARole,
};

