const mongoose = require("mongoose")
const employee = require("../models/employeeModel")


const getAllEmployee = (req, res)=>{
    
    res.status(200).json({message:`Liste de tous les employés`})
}

const getUniqueEmployee = (req, res)=>{
    
    res.status(200).json({message:`Récupération de l'employé n° ${req.params.id}`})
}

const postEmployee = (req, res)=>{
    
    res.status(200).json({message:`Création d'un nouvel employée`})
}

const putEmployee = (req, res)=>{
    
    res.status(200).json({message:`Modification de l'employé n° ${req.params.id}`})
}

const patchEmployee = (req, res)=>{
    
    res.status(200).json({message:`Ajout des donnée sur l'employé n° ${req.params.id}`})
}

const deleteEmployee = (req, res)=>{
    
    res.status(200).json({message:`Supression de l'employé n° ${req.params.id}`})
}

module.exports = {
    getAllEmployee, getUniqueEmployee,postEmployee,putEmployee, patchEmployee, deleteEmployee
}