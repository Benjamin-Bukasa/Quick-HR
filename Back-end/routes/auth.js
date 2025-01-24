const express = require("express")
const authRoutes = express.Router()
const {loginUser,currentUser}=require("../controllers/auth")
const validateToken = require("../middlewares/validateToken")


authRoutes.route('/login').post(loginUser)
authRoutes.route('/current').post(validateToken,currentUser)



module.exports = authRoutes