const db = require("./connection");

async function viewAllEmployess() {
 try {
   const employees = 
     await db.query('SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id')
    return employees [0]
 } catch (err) {
   console.log(err) 

 }
}

module.exports = { viewAllEmployess }