const mongoose = require("mongoose");
require("dotenv").config();


const connectDataBase =( )=>{
    mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true}).then((data)=>{
            console.log(`Mongodb connected with server:${data.connection.host}`);
        }).catch((err)=>{
        console.log(err) 

    })
}

module.exports = connectDataBase 