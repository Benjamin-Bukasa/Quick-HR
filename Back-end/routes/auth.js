const express = require("express")
const authRoutes = express.Router()
const {registerUser, loginUser,currentUser}=require("../controllers/auth")
const validateToken = require("../middlewares/validateToken")


authRoutes.route('/register').post(registerUser)
authRoutes.route('/login').post(loginUser)
authRoutes.route('/current').get(validateToken,currentUser)



module.exports = authRoutes