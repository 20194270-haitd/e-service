const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String },
        address: { type: String },
        publicKey: { type: String },
        cart: [{ type: Schema.Types.ObjectId, ref: 'book' }]
    },
    { 
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('user', UserSchema);

