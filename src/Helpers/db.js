const { Category, Product } = require('../Models/User');

const addCategory = async (req, res) => {

    try {
        const newCategory = new Category(req.body);
        const response = await newCategory.save();

        if (!response) {
            throw new Error("Not Saved");
        }

        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}

const addProduct = async (req, res) => {

    try {
        const newProduct = new Product(req.body);
        const response = await newProduct.save();

        if (!response) {
            throw new Error("Not Saved");
        }

        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}

module.exports = {
    addCategory,
    addProduct
}