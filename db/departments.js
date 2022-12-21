const db = require("./connection");
const inquirer = require("inquirer");

async function viewAllDepartments() {
  try {
    const departments = await db.query(" SELECT * FROM department");

    return departments;
  } catch (err) {
    console.log(err);
  }
}

async function addDepartment() {
  try {
    const departments = await viewAllDepartments();
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: `What is the name of the new department?`,
      },
    ]);

    await db.query(`INSERT INTO department (name) VALUES ("${name}")`);
    const newDepartment = await viewAllDepartments();

    return newDepartment;
  } catch (err) {
    console.log(err);
  }
}

async function deleteDepartment() {
  try {
    const allDepartments = await viewAllDepartments();
    const { id } = await inquirer.prompt([
      {
        type: "list",
        message: "Which department would you like to delete?",
        name: "id",
        choices: allDepartments.map((d) => {
          return {
            name: d.name,
            value: d.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM department Where id = ${id}`);

    return await viewAllDepartments();
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  viewAllDepartments,
  addDepartment,
  deleteDepartment,
};
