const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User");
const Achievement = require("../models/Achievement");
const { text } = require("body-parser");
require("dotenv").config();

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

exports.sendAchievement= async (req,res) =>{
    try{
        const { heading, description } = req.body;
        const userId = req.user.id;

        // find user using userId
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: flase,
                message: "userId not found"
            });
        }

        // storing achievemet 
        const achievement = req.files.achievement;
        
        // splitting image name and filtering
        const folderName = process.env.FOLDER_NAME;
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const achievementfileType = achievement.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(achievementfileType, supportedTypes)) {
            console.log("file type not supported");
            return res.status(400).json({
                success: false,
                message: "File type not Supperted",
            });
        }
        const achievementresponse = await uploadImageToCloudinary(achievement, folderName);

        const achievements = await Achievement.create({
            userId: userId,
            heading:heading,
            description:description,
            achievement:achievementresponse.secure_url
        })

        console.log("achievements", achievements);

        return res.status(200).json({
            success:true,
            message:"Achievement added successfully!",
            achievements,
        })
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAchievement = async(req, res) =>{
    try{
        const { userName } =  req.params;
        console.log("hello", userName);

        const userId = await User.findOne({username:userName});
        const achievement = await Achievement.find({userId:userId});
        console.log(achievement);

        if(!achievement){
            return res.status(404).json({
                success: false,
                message: "No achievement found",
            });
        }

        return res.status(200).json({
            // success: true,
            // message: "Discuss Found successfully",
            achievement: achievement,
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}