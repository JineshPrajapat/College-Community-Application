const express = require("express");
const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup route handler   

exports.signup = async (req, res) => {
    try {
        // get data
        const { name, email, password, role } = req.body;

        // check if user already exit
        const alreadyexistingUser = await User.findOne({ email });
        if (alreadyexistingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exist'
            });
        }

        // securing password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error in hasing '
            });
        }

        //  createing entery of user
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.staus(200).json({
            success: true,
            message: 'User registerd successfully.'
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, try agian later'
        });
    }
}


// login credential
exports.login = async (req, res) => {
    try {
        // get data from user
        const { email, password } = req.body;

        // if input are null
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'Please fill detail completely'
            })
        }
        // user exist or not
        const UserExist = await User.findOne({ email });
        if (!UserExist) {
            return res.status(401).json({
                success: false,
                message: 'User not registerd, please sign up'
            })
        }

        const payload = {
            email: UserExist.email,
            id: UserExist._id,
            role: UserExist.role
        };
        // verifying password
        if (await bcrypt.compare(password, User.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24*7h" });
            // UserExist=UserExist.toObject();
            UserExist.token = token;
            UserExist.password = undefined;

        }
        else {
            return res.status(403).json({
                success: false,
                message: 'Password incorrect.'
            })
        }

    }
    catch (error) {

    }
}