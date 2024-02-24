// auth, isStudent, is Admin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract jwt token
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not accessed'
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid'
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'something went wring while verifying the token'
        });
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role != "Student") {
            return res.status(401).json({
                success: false,
                message: 'This route is protected for student'
            });
        }
        next();
    }
    catch {
        return res.status(500).json({
            success: false,
            message: 'user role cannot be matching'
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role != "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This route is protected for Admin'
            });
        }
        next();
    }
    catch {
        return res.status(500).json({
            success: false,
            message: 'user role cannot be matching'
        });
    }
}