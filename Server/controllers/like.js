const Post = require("../models/Post");
const Discuss = require("../models/Discuss");
const Experience = require("../models/Experience");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const fs = require("fs")
const fetch = require("node-fetch");
const path = require("path");
const os = require('os');

exports.likePost = async (req, res) => {
    try {
        const { post } = req.body;
        const userId = req.user.id;
        const like = new Like({
            post: post, user: userId,
        });

        const savedLike = await like.save();

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true })
            .populate("likes")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Post liked successfully",
            post: updatedPost,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while Liking",
        });
    }
};

exports.upvotePost = async (req, res) => {
    try {
        const { post, postType } = req.body;
        const userId = req.user.id;

        // Check if the like already exists for this user and post
        const existingLike = await Like.findOne({
            postType: postType,
            "likes.post": post,
            "likes.user": userId
        });

        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "You have already upvoted this post"
            });
        }

        // Create or update the like
        let updatedLike = await Like.findOneAndUpdate(
            { postType: postType },
            {
                $addToSet: {
                    likes: { post: post, user: userId }
                }
            },
            { upsert: true, new: true }
        );

        // storing crearted post userid in likes in respective discuss and experire 
        let updatedPost;
        if (postType === 'Experience') {
            updatedPost = await Experience.findByIdAndUpdate(
                post,
                { $push: { upvotes: userId } },
                { new: true }
            ).populate('upvotes').exec();
        }
        else if (postType === 'Discuss') {
            updatedPost = await Discuss.findByIdAndUpdate(
                post,
                { $push: { upvotes: userId } },
                { new: true }
            ).populate('upvotes').exec();
        }
        else {
            throw new Error("Invalid Post type");
        }

        return res.status(200).json({
            success: true,
            message: "Post liked successfully",
            like: updatedPost
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error while upvoting post"
        });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;
        // find and delete the like collection data as per the ID given
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        // update th epost collections
        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Post unliked successfully",
            post: updatedPost,
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while unliking",
        });
    }
}

exports.createComment = async (req, res) => {
    try {

        // Fetch data from req.body
        const { post, body } = req.body;
        const userId = req.user.id;
        // create a comment object
        const comment = new Comment({
            post, userDetails: userId, body
        });

        const savedComment = await comment.save();

        // find the post by ID, and add the new comment in its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
            //Populate the comments array with comments cdocument(replace the id of comments in post object with actual comment)
            .populate("comments")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Post commented successfully",
            post: updatedPost,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while commenting",
        });
    }
}

exports.savePost = async (req, res) => {
    try {

        const { post } = req.body;
        const postdetails = await Post.findById(post);
        const imageURL = postdetails.postImageUrl;
        const dirPath = os.homedir() + '/Downloads';

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        const fileName = "download.png";

        fetch(imageURL)
            .then((response) => response.buffer())
            .then((buffer) => {

                fs.writeFile(path.join(dirPath, fileName), buffer, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Image downloaded successfully");
                        return res.json({
                            success: true,
                            message: "Image Dowunloaded successfully",
                        });
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while saving the post",
        });
    }
};