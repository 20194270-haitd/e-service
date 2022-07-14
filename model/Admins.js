const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema(
    {
        email : {type : String },
        publicKey : {type : String},
    },
    { 
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('admin', adminSchema);