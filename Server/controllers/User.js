const User = require("../models/User");
require("dotenv").config();

exports.getAllUsers = async(req, res) =>{
    try{
        const users = await User.find();

        if(!experience)
        {
            return res.status(404).json({
                success: false,
                message: "No users found",
            });
        }
        return  res.status(404).json({
            success: true,
            message: "Users Found successfully",
            users: users,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching experience",
        });
    }
};

