const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

function isFileTypeSupported (type, supportedTypes){
    return supportedTypes.includes(type)
}
// update the additional details in the profile
exports.updateProfile = async (req, res) => {
    try {

        // fetch data
        const { 
            fullName,
            gender,
            branchName,
            enrollmentNumber,
            state,
            position,
            // about="",
            // experience="",
            // skills="",
            // hobbies="",
            // links="",
            // languages=""
         } = req.body;

         console.log(req.body);

        //  storing images
        //  const studentId = req.files.studentId;
        //  const coverImage = req.files.coverImage;
        //  const profileImage = req.files.profileImage;

        // get userId
        // const id = req.user.id;
        // console.log(id);
        // const user = await User.findById(id)
        // const accountType = user.accountType;

        // validation
        if ((!fullName || !gender || !branchName || !enrollmentNumber || !state || !position)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const profileDetails = await Profile.create({
            fullName: fullName,
            gender: gender,
            branchName:branchName,
            enrollmentNumber:enrollmentNumber,
            state:state,
            position:position,

        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            profileDetails,
        });

        // const userDetails = await User.findById(id);
        // console.log(userDetails);

        // const folderName = process.env.FOLDER_NAME;
        // const supportedTypes = ['jpg', 'jpeg', 'png'];
        // const studentIdfileType = studentId.name.split(".")[1].toLowerCase();
        // const coverImagefileType = coverImage.name.split(".")[1].toLowerCase();
        // const profileImagefileType = profileImage.name.split(".")[1].toLowerCase();

        // if (!isFileTypeSupported(studentIdfileType, supportedTypes) || !isFileTypeSupported(coverImagefileType, supportedTypes) || !isFileTypeSupported(profileImagefileType, supportedTypes)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "File type not Supperted",
        //     });
        // }

        // storing url from cloudinary
        // const studentIdresponse = await uploadImageToCloudinary(studentId, folderName);
        // const coverImageresponse = await uploadImageToCloudinary(coverImage, folderName);
        // const profileImageresponse = await uploadImageToCloudinary(profileImage, folderName);

            // const profileId = userDetails.additionalDetails;  

            // const profileDetails = await Profile.findById(profileId);
            // profileDetails.fullName = fullName;
            // profileDetails.gender = gender;
            // profileDetails.branchName = branchName;
            // profileDetails.enrollmentNumber = enrollmentNumber;
            // profileDetails.position = position;
            // profileDetails.state =state;
        // profileDetails.studentId =studentIdresponse.secure_url;

        // profileDetails.about = about;
        // profileDetails.experience = experience;
        // profileDetails.skills = skills;
        // profileDetails.hobbies = hobbies;
        // profileDetails.links = links;
        // profileDetails.languages = languages;
        // profileDetails.coverImage = coverImageresponse.secure_url;
        // profileDetails.profileImage = profileImageresponse.secure_url;

    

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            profileDetails,
            userDetails,
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

// delete account
exports.deleteAccount = async (req, res) => {
    try {

        // fetch id
        const id = req.user.id;
        console.log("id ->", id)
        // validate
        const userDetails = await User.findById(id);
        console.log("userDetails ->", userDetails);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // delete user
        await User.findByIdAndDelete({ _id: id });

        // return response
        return res.status(200).json({
            success: true,
            message: "User Deleted successfully.",
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to delete profile.",
            error: err.message,
        });
    }
};

// get all details of user
exports.getUserDetails = async (req, res) => {
    try {

        // get id
        const id = req.user.id;
        // get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

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