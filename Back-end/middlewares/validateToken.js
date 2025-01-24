const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validToken = asyncHandler(async(req,res, next)=>{
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("bearer")){
        token = authHeader.split("")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("Vous n'êtes pas authorisé à effectuer cette acton");
                
            }
            console.log(decoded);
            
        })
    }
})

module.exports = validToken