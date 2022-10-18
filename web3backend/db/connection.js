const mongoose = require("mongoose");


//The Below command will connect this file to mongodb and create database web3votingsystemn if it is not printed - BIBEK

mongoose.connect("mongodb://127.0.0.1:27017/web3votingsystem",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log("Connection to MongoDB is successfull.")
}).catch((err)=>{
    console.log(`Connection couldn't be established in MongoDB`)
})
