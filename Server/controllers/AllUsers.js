const User = require("../models/User");
const Profile = require("../models/Profile");

exports.getAllUsers = async (req, res) =>{
    try{

        const UserId = req.user.id;
        // extracting user college name
        const college = await User.findOne({ _id: UserId }, { college: 1 });
        let collegeName = college.college;
        console.log(collegeName);

        // extracting allusers having college = collegeName
        const allUsersWithProfiles = await User.find({ college: collegeName }).populate('profileDetails').sort({ createdAt: -1 });
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
            allUsersWithProfiles,
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


// getting particular profile details
exports.getEachUserDetailsById  = async (req, res) =>{
    try{

        // getting userId
        const {userName} =  req.params;
        console.log(userName);
        // exctracting user profile details
        const Data = await User.findOne({username: userName}).populate("profileDetails").exec();
        console.log(Data);

        if(!Data){
            return res.status(404).json({
                success:false,
                message:"User not found."
            });
        }

        return res.status(200).json({
            // success: true,
            // message: "Fetched User details successfully",
            Data
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to get user deatils",
            error: err.message
        });
    }
}

// exports.getfilterdUsers = async (req, res) =>{
//     try{

//         const UserId = req.user.id;
//         const college = await User.findOne({ _id: UserId }, { college: 1 });
//         let collegeName = college.college;
//         console.log(collegeName);

//         // extracting allusers having college = collegeName
//         const allUsersWithProfiles = await User.find({ college: collegeName }).populate('profileDetails');
//         if(!allUsersWithProfiles)
//         { 
//             return res.status(404).json({
//                 success:false,
//                 message:"No user found!"
//             });
//         }

//         const { profession, fullName, year } = allUsersWithProfiles.profileDetails;
//         // extracting fliteration data on user 

//         const data = [];

//         if(fullName && (!profession && !year)){
//             data = await Profile.find({fullName:fullName})
//         }

//         if(profession && (!fullName && !year)){
//             data = await Profile.find({profession:profession})
//         }

//         if(year && (!profession && !fullName)){
//             data = await Profile.find({year:year})
//         }

//         if((year && profession) && (!fullName)){
//             data = await Profile.find({year:year , profession:profession})
//         }
        
//         if((year && fullName) && (!profession)){
//             data = await Profile.find({year:year , fullName:fullName})
//         }

//         if((fullName && profession) && (!year)){
//             data = await Profile.find({year:year , fullName:fullName})
//         }
        
//         if(year && profession && fullName){
//             data = await Profile.find({year:year,fullName:fullName,profession:profession})
//         }

        
//         return res.status(200).json({
//             success:true,
//             message:"All users found Successfully",
//             allUsersWithProfiles,
//         })
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             message:"Unable to fetch Users",
//             err: err.message,
//         })
//     }
// }

