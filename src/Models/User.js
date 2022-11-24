// All the schemas/structures here
const mongoose = require('mongoose');

const category = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const product = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Category = new mongoose.model('Category', category);
const Product = new mongoose.model('Product', product);

module.exports = {
    Category,
    Product
}