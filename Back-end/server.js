const express = require("express")
const dotenv = require("dotenv").config()
const connectDb = require("./config/dbConnection")
const port = process.env.PORT || 5001


connectDb()
const app = express()
const users = require("../Back-end/routes/users")


app.use(express.json())
app.use("/quickhr/api/users",users)




app.listen(port,()=>{console.log(`Le serveur démarre au port ${port}`);
})
