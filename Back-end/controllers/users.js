const mongoose = require("mongoose")
const Users = require("../models/usersModel")
const bcrypt = require("bcrypt")


//Récuperation de tous utilisateur
const getUsers = async(req, res)=>{
    const users = await Users.find()
    res.status(200).json(users)
}

//Récuperation d'un utilisateur unique
const getUser = (req, res)=>{
    res.status(200).json({message:`Récuperation de l'utilisateur n°${req.params.id}`})
}

//Création d'un nouvel utilisateur
const createUser = async (req, res)=>{
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

//Modification d'utilisateur unique
const putUser = (req, res)=>{
    res.status(200).json({message:`Des données de l'utilisateur n° ${req.params.id} ont été modifié avec succès`})
}

//Modification des données d'un utilisateur unique
const patchUser = (req, res)=>{
    res.status(200).json({message:`Des données de l'utilisateur n° ${req.params.id} ont été ajoutées avec succès`})
}

//Suppression d'un  utilisateur
const deleteUser = (req, res)=>{
    res.status(200).json({message:`L'utilisateur n° ${req.params.id} a été supprimé avec succès`})
}

module.exports = {
    getUsers,getUser,createUser,putUser,patchUser,deleteUser
}