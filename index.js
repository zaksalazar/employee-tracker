// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
// const table = require("table");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "start",
    choices: [
      {
        name: "departments",
        value:
          "View all departments",
      },
      {
        name: "roles",
        value:
          "View all roles",
      },
      {
        name: "employees",
        value:
          "View all employees",
      },
      {
        name: "addDepartment",
        value:
          "Add a new department",
      },
      {
        name: "addRole",
        value:
          "Add a new role",
      },
      {
        name: "addEmployee",
        value:
          "Add a new employee",
      },
      {
        name: "updateRole",
        value:
          "Update an employee's role",
      },
    ],
  },

  // TODO: Create a function to initialize app

function init() {
  inquirer.prompt(questions).then((respose) => {
    const md = generateMarkdown(respose);
    writeToFile("README.md", md);
  });
}

];
// Function call to initialize app

init();