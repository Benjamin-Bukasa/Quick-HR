const express = require("express")
const employeeRoute = express.Router()
const {getAllEmployee, getUniqueEmployee,postEmployee,putEmployee, patchEmployee, deleteEmployee} = require("../controllers/employee")


employeeRoute.route('/').get(getAllEmployee).post(postEmployee)
employeeRoute.route("/:id").get(getUniqueEmployee).put(putEmployee).patch(patchEmployee).delete(deleteEmployee)

module.exports = employeeRoute