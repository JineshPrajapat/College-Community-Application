const Comment = require("../models/Comment");
const Discuss = require("../models/Discuss");
require("dotenv").config();

exports.sendDiscuss = async (req, res) => {
    try {
        const {
            discussTitle,
            discussDescription,
        } = req.body;

        // getting user_id
        const userId = req.user.id;

        if ((!userId || !discussTitle || !discussDescription)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const discussDetails = await Discuss.create({
            userId: userId,
            discussTitle: discussTitle,
            discussDescription: discussDescription,
        });

        return res.status(200).json({
            success: true,
            message: "Discuss added successfully.",
            discussDetails,
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to update discuss",
            err: err.message,
        })
    }
};

exports.getDiscuss = async (req, res) => {
    try {
        const discuss = await Discuss.find()
            .populate("userId")
            .populate("comments")
            .sort({ createdAt: -1 })
            .exec();
        console.log("discuss", discuss);

        if (!discuss) {
            return res.status(404).json({
                success: false,
                message: "No discuss found",
            });
        }
        return res.status(200).json({
            // success: true,
            // message: "Discuss Found successfully",
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


// // below one is working for single comment
exports.sendComment = async (req, res) => {
    try{
        const {
            discussionId,                                      // id of discuss post shared from frontend
            body,
        } =req.body;

        // getting user_id
        console.log("disscusionId",discussionId);
        const UserId = req.user.id;

        if (( !UserId || !discussionId || !body )) {
            console.log("hello");
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const commentDetails = await Comment.create({
            body: body,
            userId:UserId
        });

        console.log("commentDetails",commentDetails);
        const updatedDiscuss = await Discuss.findByIdAndUpdate(discussionId, {$push :{comments: commentDetails._id}}, {new:true})
                                        .populate("comments")
                                        .exec();

        console.log("updatedDiscuss", updatedDiscuss);

        return res.status(200).json({
            success: true,
            message: "Comment added successfully.",
            discussionDetails: updatedDiscuss
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

exports.getComment = async (req, res) => {
    try {
        const { discussionId } = req.params;

        // const commentIds = await
        const comment = await Comment.findById(discussionId).populate("user");

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "No comment found",
            });
        }
        return res.status(404).json({
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

exports.getCommentsByDiscussionId = async (req, res) => {
    try {
        const { discussionId } = req.params;

        // Find the discussion by its ID
        const discussion = await Discuss.findById(discussionId);
        console.log("discusssion", discussion)
        if (!discussion) {
            return res.status(404).json({
                success: false,
                message: "Discussion not found",
            });
        }

        // Find all comments associated with the discussion
        const comments = await Comment.find({ _id: { $in: discussion.comments } })
            .populate("userId") // Populate the user details
            .populate({
                path: "replies",
                populate: { path: "userId", select: "username email" } // Populate replies user details
            });
        console.log("Comments", comments);

        return res.status(200).json({
            success: true,
            message: "Comments retrieved successfully",
            comments: comments,
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


// exports.sendComment = async (req, res) => {
//     try {
//         const {
//             parentId,                                      // id of discuss post shared from frontend
//             body,
//         } = req.body;

//         // getting user_id
//         const { discussionId } = req.params;
//         console.log("disscusionId", discussionId);
//         const UserId = req.user.id;

//         if ((!UserId || !discussionId || !body)) {
//             console.log("hello");
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required.",
//             });
//         }
// // ******************************************************************88
//         let comment;
//         if (parentId) {
//             // If parentId exists, it's a reply
//             const parentComment = await Comment.findById(parentId);
//             comment = new Comment({
//                 userId: req.user._id, // Assuming you have implemented authentication middleware
//                 body: body,
//             });
//             await comment.save();
//             parentComment.replies.push(comment);
//             await parentComment.save();
//         } else {
//             // Otherwise, it's a top-level comment
//             comment = await Comment.create({
//                 body: body,
//                 userId: UserId
//             });
//             console.log("commentDetails", comment);
//             const updatedDiscuss = await Discuss.findByIdAndUpdate(discussionId, { $push: { comments: comment._id } }, { new: true })
//                                     .populate("comments")
//                                     .exec();
//             console.log("updatedDiscuss", updatedDiscuss);
//         }
// // *******************************************************************8
//         // const commentDetails = await Comment.create({
//         //     body: body,
//         //     userId: UserId
//         // });

//         // console.log("commentDetails", commentDetails);
//         // const updatedDiscuss = await Discuss.findByIdAndUpdate(discussionId, { $push: { comments: commentDetails._id } }, { new: true })
//         //     .populate("comments")
//         //     .exec();

//         // console.log("updatedDiscuss", updatedDiscuss);

//         return res.status(200).json({
//             success: true,
//             message: "Comment added successfully.",
//             discussionDetails: updatedDiscuss
//         });

//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Unable to comment",
//             err: err.message,
//         })
//     }
// };
