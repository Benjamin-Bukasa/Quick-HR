//Récuperation de tous utilisateur
const getUsers = (req, res)=>{
    res.status(200).json({message:"Liste de tous les utilisateurs"})
}

//Récuperation d'un utilisateur unique
const getUser = (req, res)=>{
    res.status(200).json({message:`Récuperation de l'utilisateur n°${req.params.id}`})
}

//Création d'un nouvel utilisateur
const createUser = (req, res)=>{
    const {firstName,lastName,position,email,password,location,matricule,dateBirth,role} = req.body;
    if(!firstName || !lastName || !position || !email || !password || !location || !matricule || !dateBirth || !role){
        res.status(400);
        throw new Error("Tous les champs doivent être remplis !");
    }   
    res.status(200).json({message:`Utilisateur créé avec succès`})
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