const express = require('express');
const router = require('./Routes/User');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());

require('./Config/DatabaseConfig');

const PORT = 3000;
app.use('/user', router);

app.listen(PORT, () => {
    console.log("Server started at port", PORT);
})