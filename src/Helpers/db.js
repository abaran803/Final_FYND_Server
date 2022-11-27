const {
    Category,
    Product,
    Account
} = require('../Models/User');

const fs = require('fs');
const path = require('path');

// Package to Convert excel to JSON
const excelToJson = require('convert-excel-to-json');





// Adding Data ----------------------------------------

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

const addAccount = async (req, res) => {

    try {
        const newAccount = new Account(req.body);
        const response = await newAccount.save();

        if (!response) {
            throw new Error("Not Saved");
        }

        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}

const uploadBulkData = async (req, res) => {

    // If no file, return error
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    try {

        // Uploaded file and buffer data
        const myFile = req.files.file;
        const data = myFile.data;

        // Temperory uploading the excelsheet to read file later
        fs.writeFileSync(path.join(__dirname + '\\public\\' + myFile.name), data);

        const result = excelToJson({

            // Source of excel sheet
            source: fs.readFileSync(path.join(__dirname + '\\public\\' + myFile.name)),

            // Renaming the key attribute
            columnToKey: {
                A: 'id',
                B: 'name',
                C: 'image',
                D: 'sellerId',
                E: 'price',
                F: 'category'
            },

            // Avoid showing top row as header
            header: { rows: 1 }
        });

        // Deleting the temporary generated file
        fs.unlinkSync(path.join(__dirname + '\\public\\' + myFile.name));

        // array of products data of sheet
        const sheet = result.Sheet1;

        // Uploading each product one by one
        for (let i = 0; i < sheet.length; i++) {
            const newProduct = new Product(sheet[i]);
            await newProduct.save();
        }

        res.json({ message: 'File Successfully Uploaded' });
    } catch (e) {
        res.json({ message: 'Error: ' + e.message }).status(404);
    }

}



// Getting Data ----------------------------------------

// Getting All the Categories
const getAllCategories = async (req, res) => {

    try {

        const data = await Category.find();

        if (!data) {
            throw new Error("Not Saved");
        }

        res.status(200).json(data);

    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}

// Getting all the products from same category
const getProductsByCategory = async (req, res) => {

    try {

        const category = req.params.category;
        let data = await Product.find({ category });

        // List of authentication of all the seller
        const condition = await Promise.all(data.map(async (item) => {
            const isAuth = await Account.findOne({ _id: item.sellerId });
            return isAuth.isAuth;
        }));
        
        // Filtering the products based on the authentication of seller
        data = data.filter((item, index) => condition[index]);

        if (!data) {
            throw new Error("Not Saved");
        }

        res.status(200).json(data);

    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}

// Get Product by Id
const getProductById = async (req, res) => {

    try {

        const id = req.params.id;
        const data = await Product.findOne({ id });

        if (!data) {
            throw new Error("No Item Found");
        }
        
        const {isAuth} = await Account.findOne({ _id: data.sellerId });
        if(!isAuth) throw new Error("No Item Found");

        res.status(200).json(data);

    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}

const getProductsByName = async (req, res) => {

    try {

        const query = req.params.query;

        // All the products
        let data = await Product.find({ "name": { $regex: query, $options: 'i' } });

        // List of authentication of all the seller
        const condition = await Promise.all(data.map(async (item) => {
            const isAuth = await Account.findOne({ _id: item.sellerId });
            return isAuth.isAuth;
        }));
        
        // Filtering the products based on the authentication of seller
        data = data.filter((item, index) => condition[index]);

        if (!data) {
            throw new Error("Not Saved");
        }

        res.status(200).json(data);

    } catch (e) {
        console.log(e.message);
        res.json({ Error: e.message }).status(400)
    }

}

const getSellerData = async (req, res) => {

    try {

        const id = req.params.id;
        const data = await Account.findById(id);

        if (!data) {
            throw new Error("Not Saved");
        }

        res.status(200).json(data);

    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}




// Deleting Data ---------------------------------------

const deleteProductById = async (req, res) => {

    try {

        const id = req.params.id;
        const data = await Product.findOneAndDelete({ id });

        if (!data) {
            throw new Error("Not Saved");
        }

        res.status(200).json(data);

    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}

const deleteAccountByMail = async (req, res) => {

    try {

        const mail = req.params.mail;
        const data = await Account.findOneAndDelete({ email: mail });

        if (!data) {
            console.log(data);
            throw new Error("Not Saved");
        }

        res.status(200).json(data);

    } catch (e) {
        res.status(400).json({ Error: e.message })
    }

}





// Updating Data ---------------------------------------

const findAndUpdateAccount = async (req, res) => {

    try {

        const filter = { email: req.body.mail };
        delete req.body.mail;

        const update = { $set: req['body'] };
        const response = await Account.findOneAndUpdate(filter, update, { new: true });

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
    getSellerData
}