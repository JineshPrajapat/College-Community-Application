const Experience = require("../models/Experience");
require("dotenv").config();

exports.sendExperiences = async (req, res) => {
    try{
        const {
            experienceTitle="",
            experienceDescription,
        } =req.body;

        // getting user_id
        const UserId = req.user.id;

        if (( !experienceDescription )) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const experienceDetails = await Experience.create({
            userExperienceId:UserId,
            experienceTitle: experienceTitle,
            experienceDescription: experienceDescription,
        });

        return res.status(200).json({
            success: true,
            message: "Experience updated successfully.",
            experienceDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to update experience",
            err: err.message,
        })
    }
};


exports.getExperiences = async(req, res) =>{
    try{
        const experience = await Experience.find().populate("user");

        if(!experience)
        {
            return res.status(404).json({
                success: false,
                message: "No experience found",
            });
        }
        return  res.status(404).json({
            success: true,
            message: "Experience Found successfully",
            experience: experience,
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