
const { prompt, default: inquirer } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment } = require('./db/departments'); 
const { viewAllEmployees, addEmployee, updateEmployee } = require('./db/employees');
const { viewRoles, addRole } = require('./db/role');

const start = async (s) => {
    if (s) console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        { 
        type: "list",
        name: "choice", 
        message: "what would you like to do?",
        choices: [
                "View All Departments", 
                "View All Roles", 
                "View All Employees", 
                "Add a Department", 
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
                const employees = await viewAllEmployees()
                console.table(employees) 
                break;   
            case 'View All Roles':
                const roles = await viewRoles()
                console.table(roles)
                break;
            case 'Add a Department':
                const Newdepartment = await addDepartment() 
                console.table(Newdepartment)
                break;
            case 'Add an Employee': 
                const newEmployees = await addEmployee()
                console.table(newEmployees)
                break;  
            case 'Add a Role':
                const newRole = await addRole()
                console.table(newRole)
                break;
            case `Update Employee Role`:
                const updatedEmployee = await updateEmployee()
                console.table(updatedEmployee)
                break;
            case 'Exit': 
                console.log('Adios Amigo') 
                process.exit(); 
    }
start(false)

}


start(true);
