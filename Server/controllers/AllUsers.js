const User = require("../models/User");
// const Profile = require("../models/Profile");

exports.getAllUsers = async (req, res) =>{
    try{

        const UserId = req.user.id;

        // extracting user college name
        const college = await User.findOne({ _id: UserId }, { college: 1 });
        let collegeName = college.college;
        console.log(collegeName);

        // extracting allusers having college = collegeName
        const allUsersWithProfiles = await User.find({ college: collegeName }).populate('profileDetails');
        if(!allUsersWithProfiles)
        {
            return res.status(404).json({
                success:false,
                message:"No user found!"
            });
        }

        return res.status(200).json({
            success:true,
            message:"All users found Successfully",
            allUsersWithProfiles: allUsersWithProfiles
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Users",
            err: err.message,
        })
    }
}