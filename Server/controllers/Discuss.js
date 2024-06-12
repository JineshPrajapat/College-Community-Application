const Comment = require("../models/Comment");
const Discuss = require("../models/Discuss");
require("dotenv").config();

// Recursive function to populate nested comments
async function populateNestedComments(comment) {
    const populatedComment = await Comment.findById(comment._id)
        .populate('userId', 'username profileImage')
        .lean();

    if (populatedComment.replies.length > 0) {
        populatedComment.replies = await Promise.all(
            populatedComment.replies.map(populateNestedComments)
        );
    }

    return populatedComment;
}


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

        if(!discussDetails){
            return res.status(405).json({
                success:false,
                message:"Unable to Update query!"
            })
        }

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


exports.getDiscussbyTitle = async (req, res) => {
    try {
        const {discussTitle} = req.params;
        const discuss = await Discuss.find({discussTitle:discussTitle})
            .populate("userId")
            .populate("comments")
            .sort({ createdAt: -1 })
            .exec();
        // console.log("discuss", discuss);

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

exports.addNestedCommet = async(req, res) =>{
    const { commentID, discussionId  } = req.params;
    const { nestedComment } = req.body;
    const UserId = req.user.id;

    console.log("nested comment", req.params);
    try{
        const parentComment = await Comment.findById(commentID);

        if (!parentComment) {
            return res.status(404).json({
                success: false,
                message: "Parent comment not found"
            });
        }

        // Create a new nested comment
        const newComment = new Comment({
            userId: UserId,
            body: nestedComment,
            replies: []
        });

        // Save the new nested comment
        const savedComment = await newComment.save();

        // Add the new nested comment's ID to the parent comment's replies array
        parentComment.replies.push(savedComment._id);

        await parentComment.save();

        res.status(201).json({
            success: true,
            message: "Nested comment added successfully",
            comment: savedComment
        });

        console.log("commentInfo");
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }

}

exports.getCommentsByDiscussionId = async (req, res) => {
    const { discussionId } = req.params;

    try {
        // Fetch the comments for the discussion
        const discussion = await Discuss.findById(discussionId);

        let comments = await Comment.find({ _id: { $in: discussion.comments } })
            .populate('userId', 'username profileImage')
            .lean();

        // Populate nested replies
        comments = await Promise.all(
            comments.map(populateNestedComments)
        );

        res.status(200).json({
            success: true,
            comments,
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
