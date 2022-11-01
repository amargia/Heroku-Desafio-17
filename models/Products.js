const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    price: {
        type: Number,
        required: true,
        max: 100
    },
    thumbnail: {
        type: String,
        required: true,
        max: 100
    }
});

module.exports = new model("Product", productsSchema);