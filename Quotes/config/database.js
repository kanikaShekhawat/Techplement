const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect =  () => {
 
     mongoose.connect('mongodb://0.0.0.0:27017/quotedata', {
   
    }).then(()=>{    console.log('MongoDB connected successfully')}) 
    .catch((error)=>{console.log("Recieved an error" ,error)});

 
};

module.exports = dbConnect;
