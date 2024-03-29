// All the user actions like update, delete etc here
const express = require('express');
const router = express.Router();
const { 
    addCategory, 
    addProduct, 
    addAccount, 
    getAllCategories,
    getProductsByCategory,
    getProductById,
    getProductsByName,
    deleteProductById,
    deleteAccountByMail,
    findAndUpdateAccount,
    uploadBulkData,
    getSellerData,
    getNumberOfProduct,
    getProfileOverview,
    getProfileFull,
    getCartData,
    addCartItem,
} = require('../Helpers/db');

// Adding Data to Database
router.post('/addCategory', addCategory);
router.post('/upload/', addProduct);
router.post('/addAccount', addAccount);
router.post('/upload/bulk', uploadBulkData);
router.post('/upload/single', addProduct);
router.put('/addToCart', addCartItem);

// Getting Data from Database
router.get('/getAllCategories', getAllCategories);
router.get('/getProductsByCategory/:category', getProductsByCategory);
router.get('/getProductById/:id', getProductById);
router.get('/productsByName/:query', getProductsByName);
router.get('/seller/:id', getSellerData);
router.get('/getNumberOfProduct/:count', getNumberOfProduct) // Getting n numbet of products
router.get('/profileOverview/:id', getProfileOverview);
router.get('/profileFull/:id', getProfileFull);
router.get('/getCartData/:id', getCartData);

// Deleting Data from Database
router.delete('/deleteProductById/:id', deleteProductById);
router.delete('/deleteAccountByMail/:mail', deleteAccountByMail)

// Updating Data in Database
router.put('/findByMailAndUpdate', findAndUpdateAccount);

module.exports = router;