<<<<<<< HEAD
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
=======
// Importing the Mongoose library
const mongoose = require("mongoose");

// Importing the environment variables using the dotenv library
require("dotenv").config();

// Defining a function to connect to the database
const dbConnect = () => {
	// Connecting to the database using the provided URL from the environment variables
	mongoose
		.connect(process.env.DATABASE_URL, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		})
		// If the connection is successful, log a success message
		.then(() => console.log("DB CONNECTION SUCCESS"))
		// If there are issues connecting to the database, log an error message and exit the process
		.catch((err) => {
			console.log(`DB CONNECTION ISSUES`);
			console.error(err.message);
			process.exit(1);
		});
};

// Exporting the dbConnect function for use in other files
module.exports = dbConnect;
>>>>>>> aa4615fbd98a8c03e31ab015f5deb3e9a424b55f
