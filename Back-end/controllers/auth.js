const user = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../models/usersModel")



const loginUser = async(req,res)=>{
    const {email, password} =req.body

    if(!email || !password){
        res.status(400);
        throw new Error("Tous les champs doivent être remplis !");
    }

    const user = await Users.findOne({email})

    if(user &&  (await bcrypt.compare(password, user.password))){
        const accessToken =  jwt.sign({
            user:{
                username: user.firstName,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"1m"
        }
    )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Adress email ou mot de passe incorrect ");
        
    }
}


const currentUser = async(req,res)=>{
    res.status(200).json({message:`current user`})
}

module.exports = {
    loginUser,
    currentUser
}