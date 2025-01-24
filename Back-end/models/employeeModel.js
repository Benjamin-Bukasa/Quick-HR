const mongoose = require("mongoose")


const employeeSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "Veuillez entre votre prénom"]
    },
    middleName:{
        type:String,
        required:[true, "Veuillez entre votre nom"]
    },
    lastName:{
        type:String,
        required:[true, "Veuillez entre votre post-nom"]
    },
    gender:{
        type:[String],
        enum:['HOMME','FEMME','AUCUN'],
        default:null,
    },
    placeOfBirth:{
        type:String,
        required:[true, "Veuillez entrer le lieu de naissance"]
    },
    dateOfBirth:{
        type:Date,
        default:Date.now,
        required:[true, "Chossisez la date de naissance"]
    },
    matricule:{
        type:String,
        required:[true, "Entrez votre Matricule"],
        unique:true
    },
    dapartment:{
        type:[String],
        enum:["DIRECTION_GENERALE","OUTSOURCING","RESSOURCES_HUMAINES","COMMERCIALE","FINANCES","PAYROLL","IT","GROUPE","SST","GSV","AUTRES"],
        default:null
    },
    position:{
        type:String,
        required:[true, "Veuillez entre votre post-nom"]
    },
    civilStatus:{
        type:[String],
        enum:["MARIE","CELIBATAIRE","AUCUN"],
        default:null 
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now, 
      }, 

},
{
    timestamp:true,
})

module.exports = mongoose.model("Employee", employeeSchema)