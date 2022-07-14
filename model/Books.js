const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema(
    {
        name: { type: String },
        type: { type: String },
        thumbnail: { type: String },
        quantity: { type: Number},
        author: { type: String },
        description: { type: String },
        price: { type: String },
    },
    { 
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('book', bookSchema);