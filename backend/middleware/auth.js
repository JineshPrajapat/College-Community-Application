const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

<<<<<<< HEAD
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
=======
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
>>>>>>> aa4615fbd98a8c03e31ab015f5deb3e9a424b55f
