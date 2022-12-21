const db = require("./connection");
const { prompt, default: inquirer } = require("inquirer");

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
    const department = await viewRoles();
    const { title, salary } = await prompt([
      {
        type: "input",
        name: "title",
        message: `What is the title of the new role?`,
      },
      {
        type: "list",
        name: "department",
        message: `To what department does this role belong?`,
        choices: department.map((role) => {
          return {
            value: role.title,
            name: role.id,
          };
        }),
      },
      {
        type: "list",
        name: "salary",
        message: `What is the annual salary for this role?`,
      },
    ]);

    await db.query(
      `INSERT INTO employee (id, title, salary) VALUES (, "${title}", ${salary})`
    );
    const newRole = await viewRole();

    return newRole;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { viewRoles, addRole };
