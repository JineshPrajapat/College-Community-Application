const Comment = require("../models/Comment");
const Discuss = require("../models/Discuss");
require("dotenv").config();

exports.sendDiscuss = async (req, res) => {
    try{
        const {
            discussTitle,
            discussDescription,
        } =req.body;

        // getting user_id
        // const id = req.user.id;

        if (( !discussTitle || !discussDescription )) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const discussDetails = await Discuss.create({
            discussTitle: discussTitle,
            discussDescription: discussDescription,
        });

        return res.status(200).json({
            success: true,
            message: "Discuss added successfully.",
            discussDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to update discuss",
            err: err.message,
        })
    }
};

exports.getDiscuss = async(req, res) =>{
    try{
        const discuss = await Discuss.find().populate("user");

        if(!discuss)
        {
            return res.status(404).json({
                success: false,
                message: "No discuss found",
            });
        }
        return  res.status(404).json({
            success: true,
            message: "Discuss Found successfully",
            discuss: discuss,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching discuss",
        });
    }
};



exports.sendComment = async (req, res) => {
    try{
        const {
            discussId,
            body,
        } =req.body;

        // getting user_id
        const id = req.user.id;

        if (( !discussId || !body )) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const discussDetails = await Comment.create({
            discussId: discussId,
            body: body,
            userDetails:id
        });

        return res.status(200).json({
            success: true,
            message: "Comment added successfully.",
            discussDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to comment",
            err: err.message,
        })
    }
};

exports.getComment =async (req, res) =>{
    try{
        const {discussId} = req.body;
        const comment = await Comment.findById(discussId).populate("user");

        if(!comment)
        {
            return res.status(404).json({
                success: false,
                message: "No comment found",
            });
        }
        return  res.status(404).json({
            success: true,
            message: "Comment Found successfully",
            comment: comment,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching comments",
        });
    }
}
