const mongoose = require('mongoose');

// All the schemas/structures here

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
        default: mongoose.Types.ObjectId(),
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
        type: String,
        required: true
    },
    category: {
        type: String
    },
    area: {
        type: String
    },
    description: {
        type: String,
        required: true
    }
})

const account = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    aadhar: {
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    mob_no: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },

    // Default value generated is false
    // Used to show blue tick
    isTrusted: {
        type: Boolean,
        default: false
    },

    // Check if account is authenticated
    // Didn't show seller is false
    isAuth: {
        type: Boolean,
        default: false
    },

    // Overall rating of an account by others, based on history
    rating: {
        type: mongoose.Types.Decimal128,
        default: -1
    },

    // Token of all the logged in session
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

const cart = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

const Category = new mongoose.model('Category', category);
const Product = new mongoose.model('Product', product);
const Account = new mongoose.model('Account', account);
const Cart = new mongoose.model('Cart', cart);

module.exports = {
    Category,
    Product,
    Account,
    Cart
}