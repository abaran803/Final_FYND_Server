// Configuring the Database here
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URI}/ff`)
.then(res => console.log("Connected to Database"))
.catch(err => console.log("Error:", err.message));