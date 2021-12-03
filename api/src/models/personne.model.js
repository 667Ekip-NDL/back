const mongoose = require('mongoose')

const personne = new mongoose.Schema(
    {
        nom: {type:String},
        prenom:  {type:String},
        title: {type:String},
    },
    {
        timestamps: true
    }
)
    
const personneModel = mongoose.model('personne', personne)
    
module.exports = personneModel