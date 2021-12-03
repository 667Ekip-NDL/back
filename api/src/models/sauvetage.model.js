const mongoose = require('mongoose')

const sauvetage = new mongoose.Schema(
    {
        title: {type:String},
        date: {type:String},
        participants: {type:[String]},
        saved: {type:String}
    },
    {
        timestamps: true
    }
)
    
const sauvetageModel = mongoose.model('sauvetage', sauvetage)
    
module.exports = sauvetageModel