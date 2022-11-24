// Configuring the Database here
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ff')
.then(res => console.log("Connected to Database"))
.catch(err => console.log("Error:", err.message));