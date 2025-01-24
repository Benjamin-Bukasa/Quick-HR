const express = require("express")
const dotenv = require("dotenv").config()
const connectDb = require("./config/dbConnection")
const port = process.env.PORT || 5001


connectDb()
const app = express()
const users = require("../Back-end/routes/users")
const employees = require("./routes/employee")
const authRoutes = require("./routes/auth")


app.use(express.json())
app.use("/quickhr/api/users",users)
app.use("/quickhr/api/employee",employees)
app.use("/quickhr/api/auth",authRoutes)



app.listen(port,()=>{console.log(`Le serveur démarre au port ${port}`);
})
