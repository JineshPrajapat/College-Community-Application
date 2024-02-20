const express = require("express");
const app=express();

require('dotenv').config();
const PORT =process.env.PORT;
 
app.use(express.json());

require("./config/database").connect();

//route import anaad mount;

const user =require("./routes/user");

// activation
app.listen(4000, ()=>{
    console.log(`server is start on port ${PORT}`);
})