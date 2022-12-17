
const { prompt, default: inquirer } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments } = require('./db/departments'); 
const { viewAllEmployess } = require('./db/employees'); 

const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        { 
        type: "list",
        name: "choice", 
        message: "what would you like to do?",
        choices: [
                "View All Departments", 
                "View All Roles", 
                "View All Employees", 
                "Add A Department", 
                "Add a Role", 
                "Add an Employee", 
                "Update Employee Role", 
                "Exit"
            ]
         }

    ])
        switch (choice) { 
            case 'View All Departments': 
                const departments = await viewAllDepartments()
                console.table(departments)
                break;
            case 'View All Employees':
                const employees = await viewAllEmployess()
                console.table(employees) 
                break;   
    }

}


start();
