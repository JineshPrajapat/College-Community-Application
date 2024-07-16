const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.body.token || req.headers.authorization;

        // Check if token exists
        if (!token) {
            // console.log("token not found");
            return res.status(401).json({
                success: false,
                message: "Token not found.",
            });
        }

        // Remove "Bearer " prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next(); // Call next middleware
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is not valid",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while token verification.",
        });
    }
}


exports.Auth = (async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found.",
        });
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

// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Student only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}


// isCollege
exports.isCollege = async(req, res, next) => {
    try{
        if(req.user.college === "college name"){
            next();
        }
        else{
            return res.status(401).json({
                success:false,
                message:"This is the protected route for ctae college"
            });
        }

    }catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verify the college",
        });
    }
}

// isInstructor
exports.isLecturer = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Lecturer") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Lecturer only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Admin only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}