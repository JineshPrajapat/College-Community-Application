const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

exports.getPostPic = async (req, res) => {
    try {
        console.log("USER ", req.user.id);
        const posts = await Post.find({}).sort({ postedAt: -1 });

        if (!posts) {
            return res.status(404).json({
                success: false,
                message: "No post found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post Found successfully",
            posts: posts,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching post pic",
        });
    }
};

async function uploadFileToCloud(file, folder, quality) {
    const options = { folder }
    console.log("tempFilePath", file.tempFilePath);
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.sendPostPic = async (req, res) => {
    try {

        const { caption, category } = req.body;
        const userId = req.user.id;
        const postPic = req.files.postPic;

        if (!userId || !category || !postPic || !caption) {
            return res.status(300).json({
                success: false,
                mesage: "All fienlds are required.",
            });
        }

        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = postPic.name.split(".")[1].toLowerCase();

        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File type not Supperted",
            });
        }

        const response = await uploadFileToCloud(postPic, "Campus_Connect");
        console.log("response -> ", response);

        const postData = await Post.create({
            user: userId,
            postImageUrl: response.secure_url,
            caption: caption,
            category: category,
        });

        const userDetails = await User.findByIdAndUpdate(userId, { $push: { news: postData._id } }, { new: true });

        res.status(200).json({
            success: true,
            postImageUrl: response.secure_url,
            message: "Pic posted successfully",
            postData: postData,
            currentUserDetails: userDetails,
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while posting pic",
        });
    }
};

exports.videoUpload = async (req, res) => {
    try {

        const { caption, category } = req.body;
        const userId = req.user.id;
        const postVideo = req.files.postVideo;

        const supportedTypes = ['mov', 'mp4'];
        const fileType = postVideo.name.split(".")[1].toLowerCase();

        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File type not Supperted",
            });
        }

        const response = await uploadFileToCloud(postVideo, "images");
        console.log("response -> ", response);

        const postData = await Post.create({
            user: userId,
            postImageUrl: response.secure_url,
            caption: caption,
            category: category,
        });

        const userDetails = await User.findById(userId);


        res.status(200).json({
            success: true,
            postImageUrl: response.secure_url,
            message: "Pic posted successfully",
            postData: postData,
            currentUserDetails: userDetails,
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while posting video",
        });
    }
};