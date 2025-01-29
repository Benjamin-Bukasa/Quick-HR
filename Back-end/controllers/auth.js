const user = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../models/usersModel")




const registerUser = async (req, res)=>{
    const {firstName,lastName,position,email,phone,password,location,matricule,dateBirth,role} = req.body;
    if(!firstName || !lastName || !position || !email || !phone || !password || !location || !matricule || !dateBirth || !role){
        res.status(400);
        throw new Error("Tous les champs doivent être remplis !");
    }   

    const userAvailable = await Users.findOne({email})

    if(userAvailable){
        res.status(400);
        throw new Error("L'utilisateur existe déjà !");
    }

    const hpassword = await bcrypt.hash(password,10)
    console.log("Hashed password: ",hpassword); 
    const user = await Users.create({
        firstName,
        lastName,
        position,
        email,
        phone,
        password:hpassword,
        location,
        matricule,
        dateBirth,
        role
    })

    if(user){
        res.status(200).json({message:`Utilisateur créé avec succès`})
        console.log("user created :", firstName+" "+lastName);

    }else{
        res.status(400);
        throw new Error("Les donnée d'utilisatur ne sont pas valides !");
        
    }
    
}


const loginUser = async(req,res)=>{
    const {email, password} =req.body

    if(!email || !password){
        res.status(400);
        throw new Error("Tous les champs doivent être remplis !");
    }

    const user = await Users.findOne({email})
    // Comparer si le mot de passe correspond à celui de l'utilisateur créé
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
    res.status(200).json(req.user)
}

module.exports = {
    loginUser,
    currentUser,
    registerUser
}