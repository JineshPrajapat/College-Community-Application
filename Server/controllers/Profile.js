const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

function isFileTypeSupported (type, supportedTypes){
    return supportedTypes.includes(type)
}
// update the profile after signup
exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        const { 
            fullName,
            gender,
            profession,
            state,
            // about="",
            // experience="",
            // skills="",
            // hobbies="",
            // links="",
            // languages=""
         } = req.body;

         console.log(req.body);

        //  get userId
        const userId = req.user.id;
        console.log("userId", userId);

        //  storing images
        //  const coverImage = req.files.coverImage;
        //  const profileImage = req.files.profileImage;
        
        // validation
        if ((!userId ||!fullName || !gender || !state || !profession)) {
            console.log(userId,fullName,gender, state, profession );
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // spliting image name and filtering
        const folderName = process.env.FOLDER_NAME;
        const supportedTypes = ['jpg', 'jpeg', 'png'];

        // const coverImagefileType = coverImage.name.split(".")[1].toLowerCase();
        // const profileImagefileType = profileImage.name.split(".")[1].toLowerCase();

                // if (!isFileTypeSupported(coverImagefileType, supportedTypes) ) {
                //     return res.status(400).json({
                //         success: false,
                //         message: "File type not Supperted",
                //     });
                // }

        // storing url from cloudinary
        // const coverImageresponse = await uploadImageToCloudinary(coverImage, folderName);
        // const profileImageresponse = await uploadImageToCloudinary(profileImage, folderName);

        // find profile id
        const userDetails = await User.findById(userId);
        const profileId = userDetails.profileDetails;
        const profileDetail = await Profile.findById(profileId);

        // updating profile
        profileDetail.fullName = fullName;
        profileDetail.gender = gender;
        profileDetail.profession = profession;
        profileDetail.state = state;
        // profileDetail.about = about;
        // profileDetail.experience = experience;
        // profileDetail.skills = skills;
        // profileDetail.hobbies = hobbies;
        // profileDetail.links = links;
        // profileDetail.languages = languages;

        await profileDetail.save();


        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            profileDetail,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to update profile.",
            error: err.message,
        });
    }
};

// updateAdditionalProfile
exports.updateAdditionalProfile = async (req, res) =>{
    try{

        const UserId = req.user.id;

        // check if user exist or not
        const user= await User.findById(UserId);
        console.log("user",user);
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const {
            about="",
            position="",
            experience="",
            skills="",
            hobbies="",
            languages="",
            linkedin="",
            github="",
            twitter="",
            youtube=""
        } = req.body;


        const profileId = user.profileDetails;
        let profile = await Profile.findById(profileId);
        
        // if profile exist then only
        if(profile)
        {
            profile.about = about;
            profile.position = position;
            profile.experience = experience;
            profile.skills = skills.split(',');
            profile.languages = languages.split(',');
            profile.hobbies = hobbies.split(',');
            profile.links = [
                {type: 'LinkedIn', url: linkedin},
                {type: 'GitHub', url: github},
                {type: 'Twitter', url: twitter},
                {type: 'YouTube', url: youtube}
            ];
        }

        console.log("profile", profile);

        await profile.save();

        return res.status(200).json({
            success: true,
            message: "Addidtional Profile details updated successfully!.",
            profile,
        });

    }
    catch (error) {
        console.error('Error updating additional profile details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get all details of user
exports.getUserDetails = async (req, res) => {
    try {

        // get id
        const id = req.user.id;
        // get user details
        const userDetails = await User.findById(id).populate("profileDetails").exec();

        // validation
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Fetched User details successfully.",
            userDetails,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to get user Details.",
            error: err.message,
        });
    }
};

// update the profile picture
exports.updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("UserId -> ", userId);
        console.log("Type of userId -> ", typeof (userId));
        const profilePicture = req.files.profilePicture;
        const folderName = process.env.FOLDER_NAME;
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = profilePicture.name.split(".")[1].toLowerCase();

        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File type not Supperted",
            });
        }

        const response = await uploadImageToCloudinary(profilePicture, folderName);
        console.log("response -> ", response);
        const userDetails = await User.findByIdAndUpdate(userId);
        userDetails.profileImage = response.secure_url;
        await userDetails.save();
        console.log("User Details -> ", userDetails);

        return res.json({
            success: true,
            image_url: response.secure_url,
            message: "Image Uploaded successfully",
            userDetails,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};




// // delete account
// exports.deleteAccount = async (req, res) => {
//     try {

//         // fetch id
//         const id = req.user.id;
//         console.log("id ->", id)
//         // validate
//         const userDetails = await User.findById(id);
//         console.log("userDetails ->", userDetails);
//         if (!userDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found.",
//             });
//         }

//         // delete profile
//         await Profile.findByIdAndDelete({ _id: userDetails.profileDetails });

//         // delete user
//         await User.findByIdAndDelete({ _id: id });

//         // return response
//         return res.status(200).json({
//             success: true,
//             message: "User Deleted successfully.",
//         });

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Unable to delete profile.",
//             error: err.message,
//         });
//     }
// };