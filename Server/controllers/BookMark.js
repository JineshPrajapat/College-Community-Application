const mongoose = require("mongoose");
const BookMark = require("../models/BookMark");
const User = require("../models/User");

exports.getBookmarkForUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const bookmark = await BookMark.findOne({ userId }).populate("savedPosts.postId").exec();
        if (bookmark) {
            return res.status(200).json({
                sucess: true,
                message: "BookMark fetched successFully",
                bookmark: bookmark.savedPosts
            });
        }
        return res.status(400).json({
            success: false,
            message: "No post found"
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching discuss",
        });
    }
};

exports.saveBookmarkForUser = async (req, res) => {
    const userId = req.user.id;
    const { postId, postType } = req.body;

    try {
        if (!postId && postType) {
            return res.status(404).json({
                success: false,
                message: "postId is not defined"
            });
        }

        const bookMark = await BookMark.findOne({ userId: userId });
        // console.log(bookMark);
        if (!bookMark) {
            const newBookMark = new BookMark({
                userId,
                savedPosts: [{
                    type: postType,
                    postId: [postId]
                }]
            });
            await newBookMark.save();
        }
        else {
            let existingPost = bookMark.savedPosts.find(post => post.type === postType);
            if (!existingPost) {
                bookMark.savedPosts.push({ type: postType, postId: [postId] });
            }
            else {
                if (!existingPost.postId.includes(postId)) {
                    existingPost.postId.push(postId);
                }
                else {
                    // Remove the postId from the array
                    const index = existingPost.postId.indexOf(postId);
                    if (index > -1) {
                        existingPost.postId.splice(index, 1);
                    }

                    await BookMark.findOneAndUpdate(
                        { userId: userId },
                        { savedPosts: bookMark.savedPosts }, // Update the savedPosts array
                        { new: true } // To return the updated document
                    );

                    return res.status(202).json({
                        success: true,
                        message: `Post with ID ${postId} already saved in ${postType}, and has been removed from the list.`
                    });
                }
            }
            await bookMark.save();
        }

        return res.status(200).json({
            success: true,
            message: "Saved to BookMark"
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

exports.getDiscussBookMark = async (req, res) => {
    const userId = req.user.id;
    try {
        const bookmark = await BookMark.findOne({ userId }).populate("savedPosts.postId");

        if (bookmark) {
            const discussPosts = bookmark.savedPosts.filter(post => post.type === "Discuss");
            const discussPostIds = discussPosts.map(post => post.postId).flat(); // Flattening arrays of postIds
            console.log("Discuss Post Ids:", discussPostIds);

            return res.status(200).json({
                sucess: true,
                message: "BookMark fetched successFully",
                bookmark: discussPostIds
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "No post found"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching discuss",
        });
    }
}

exports.bookmarkStatebyId = async (req, res) => {
    const userId = req.user.id;

    try {
        const { postId } = req.params;
        const bookmark = await BookMark.findOne({ userId }).populate("savedPosts.postId");

        if (bookmark) {
            let bookmarkState = 0;

            const discussPosts = bookmark.savedPosts.filter(post => post.type === "Discuss");
            const discussPostIds = discussPosts.map(post => post.postId).flat();
            const discussId = discussPostIds.filter(post => post._id.equals(postId));

            if (discussId.length == 1) {
                bookmarkState = 1;
            }

            return res.status(200).json({
                success: true,
                message: "status fetched",
                bookmarkState: bookmarkState
            })
        }

        else {
            return res.status(200).json({
                success: true,
                message: "status fetched",
                bookmarkState: 0
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching discuss",
        });
    }
}

exports.getExperienceBookMark = async (req, res) => {
    const userId = req.user.id;
    try {
        const bookmark = await BookMark.findOne({ userId }).populate("savedPosts.postId");

        if (bookmark) {
            const discussPosts = bookmark.savedPosts.filter(post => post.type === "Experience");
            const discussPostIds = discussPosts.map(post => post.postId).flat(); // Flattening arrays of postIds
            console.log("Discuss Post Ids:", discussPostIds);

            return res.status(200).json({
                sucess: true,
                message: "BookMark fetched successFully",
                bookmark: discussPostIds
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "No post found"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching discuss",
        });
    }
}