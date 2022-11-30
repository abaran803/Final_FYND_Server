const express = require('express');
const router = require('./Routes/User');
const auth = require('./Routes/Authentication');
const {auth: checkAuth} = require('./Helpers/db');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(fileUpload());
app.use(express.json());

require('./Config/DatabaseConfig');

const PORT = 3000;
app.use('/user', checkAuth, router);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.json({status: "API is working properly"});
})

app.listen(PORT, () => {
    console.log("Server started at port", PORT);
})