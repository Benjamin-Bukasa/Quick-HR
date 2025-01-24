const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "Veuillez entrez votre prénom"],
    },
    lastName:{
        type:String,
        required:[true, "Veuillez entre votre nom et post-nom"]
    },
    email:{
        type:String,
        required:[true, "Entrez votre adresse email"],
        unique:true // le mot de passe doit être unique pour créer un utilisateur
    },
    password:{
      type:String,
      required:[true, "Entrez une addresse !"],
  },
    position:{
        type:String,
        required:[true, "Entrez votre poste au sein dans l'entreprise"]
    },
    location:{
        type:String,
        required:[true, "Entrez votre lieu de travail"]
    },
    phone: {
        type: String,
        required: true,
        unique: true, // Empêche les doublons
        validate: {
          validator: function (v) {
            // Regex pour les numéros au format international (+243 pour la RDC)
            return /^\+?[1-9]\d{1,14}$/.test(v);
          },
          message: props => `${props.value} n'est pas un numéro de téléphone valide !`,
        },
      },
   matricule:{
    type:String,
    required:[true, "Entrez votre Matricule"],
    unique:true
   },
   dateBirth:{
    type:Date,
    default:Date.now,
    required:[true, "Chossisez une date nde naissance"]
   },
 
   role: {
    type: [String], // Tableau de rôles
    enum: ['admin', 'editor', 'viewer'],
    default: ['viewer'],
  },
   createdAt: {
    type: Date,
    default: Date.now, // Définit automatiquement la date actuelle
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Définit automatiquement la date actuelle
  }, 
},
{
    timestamp:true,
})


module.exports = mongoose.model("Users", userSchema)