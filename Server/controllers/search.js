const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

exports.getCollegeNews = async (req, res) => {
    try {

        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        const userCollege = userDetails.collegeName;

        const usersCollegues = await User.find({}, { collegeName: userCollege });

        if (!usersCollegues) {
            return res.status(200).json({
                success: true,
                message: "No user found",
            });
        }

        const posts = await Post.find({}).sort({ postedAt: -1 })

        if (!posts) {
            return res.status(200).json({
                success: true,
                message: "No post found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Posts found",
            posts: posts,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while getting college news",
        });
    }
};

exports.searchUser = async (req, res) => {
    try {

        const { firstName = "", userName = "", collegeName = "" } = req.body;

        const users = [];

        if (userName) {
            const profileDetails = await Profile.find({ userName: userName })
            users.push(profileDetails);
        }

        if (collegeName) {
            const collegeDetails = await User.find({ collegeName: collegeName });
            users.push(collegeDetails);
        }

        if (firstName) {
            const search = await User.find({ firstName: firstName });
            users.push(search);
        }

        if (!users) {
            return res.status(404).json({
                success: false,
                message: "No user found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            users: users,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while searching for user",
        });
    }
};

exports.searchPost = async (req, res) => {
    try {

        const { category = "", userName = "" } = req.body;

        const posts = [];

        if (userName) {
            const profileDetails = await Profile.find({},{ userName: userName });
            console.log("Profile Details -> ", profileDetails)
            const userDetails = await User.find({ additionalDetails: profileDetails[0]._id }).populate("news").exec()
            console.log("UserDetails-> ", userDetails);
            posts.push(userDetails);
        }

        if (category) {
            const postDetails = await Post.find({ category: category });
            posts.push(postDetails);
        }

        if (!posts) {
            return res.status(404).json({
                success: false,
                message: "No posts found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "posts found",
            posts: posts,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while searching for posts",
        });
    }
};

exports.searchHome = async (req, res) => {
    try {

        const { category = "" } = req.body;

        const posts = [];

        if (category) {
            const postDetails = await Post.find({ category: category }).sort({ postedAt: -1 });
            posts.push(postDetails);
        }

        const postDetails = await Post.find({}).sort({ postedAt: -1 });
        posts.push(postDetails);

        if (!posts) {
            return res.status(404).json({
                success: false,
                message: "No posts found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "posts found",
            posts: posts,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while searching for posts",
        });
    }
};

