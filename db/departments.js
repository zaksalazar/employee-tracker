 const db = require("./connection");
 const { prompt, default: inquirer } = require("inquirer");

 async function viewAllDepartments() {
  try{
    const departments = 
      await db.query(' SELECT * FROM department')

    return departments
  } catch (err) {
    console.log(err) 

  }
}

async function addDepartment() {
  try {
    const departments = await viewAllDepartments();
    const {name} = await prompt([
      {
        type: "input",
        name: "name",
        message: `What is the name of the new department?`,
      },
    ]);

    await db.query(
      `INSERT INTO department (name) VALUES ("${name}")`
    );
    const newDepartment = await viewAllDepartments();

    return newDepartment;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllDepartments, 
addDepartment
 }