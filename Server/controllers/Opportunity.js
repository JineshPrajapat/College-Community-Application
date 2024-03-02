const Opportunity = require("../models/Opportunity");
require("dotenv").config();

exports.sendOpportunity = async (req, res) => {
    try{
        const {
            profile,
            company,
            branch,
            positionType,
            yearOfExperience,
            opportunityLink,
            applicationDeadline
        } =req.body;

        // getting user_id
        const UserId = req.user.id;

        if (( !UserId || !profile || !company || !branch || !positionType || !yearOfExperience || !opportunityLink || !applicationDeadline )) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const oppportunityDetails = await Opportunity.create({
            userOppotunityId:UserId,
            profile: profile,
            company: company,
            branch: branch,
            positionType: positionType,
            yearOfExperience: yearOfExperience,
            opportunityLink: opportunityLink,
            applicationDeadline:applicationDeadline
        });

        return res.status(200).json({
            success: true,
            message: "Opportunity updated successfully.",
            oppportunityDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to update opportunity",
            err: err.message,
        })
    }
};

exports.getOpportunity = async(req, res) =>{
    try{
        const opportunity = await Opportunity.find();

        if(!opportunity)
        {
            return res.status(404).json({
                success: false,
                message: "No opportunity found",
            });
        }
        return  res.status(200).json({
            // success: true,
            // message: "Opportunity Found successfully",
            opportunity: opportunity,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching opportunity",
        });
    }
};