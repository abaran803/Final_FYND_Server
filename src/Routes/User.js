// All the user actions like update, delete etc here
const express = require('express');
const router = express.Router();
const { addCategory, addProduct } = require('../Helpers/db');

router.get('/', (req, res) => {
    res.send("Homepage");
})

router.post('/addCategory', addCategory);

router.post('/addProduct', addProduct);

module.exports = router;