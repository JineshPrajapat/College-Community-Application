const User = require("../models/User");

exports.acceptRequest = async (req, res) => {
    try {

        const userId = req.user.id;
        const { acceptingUserid } = req.body;
        if (!acceptingUserid) {
            return res.status(404).json({
                success: false,
                message: "Please enter valid user id",
            });
        }
        console.log("UserID", userId)
        console.log("Accepting user id", acceptingUserid)
        const acceptingUserDetails = await User.findByIdAndUpdate(
            { _id: acceptingUserid },
            { $pull: { pendingFollowing: { $in: [userId] } } },

            // { $pull: { fruits: { $in: ["apples", "oranges"] }, vegetables: "carrots" } },

            { $push: { following: userId } }, { new: true }
        );

        const updatedUserDetails = await User.findByIdAndUpdate(
            { _id: userId },
            { $pull: { pendingFollower: { $in: [acceptingUserid] } } },
            { $push: { follower: acceptingUserid } }, { new: true }
        );

        updatedUserDetails.activity = acceptingUserDetails.firstName + " Started following you.";
        await updatedUserDetails.save();

        acceptingUserDetails.activity = updatedUserDetails.firstName + " accepted your follow request.";
        await acceptingUserDetails.save();

        return res.status(200).json({
            success: true,
            message: "You have successfully accepted the follow request.",
            acceptingUserDetails: acceptingUserDetails,
            UserDetails: updatedUserDetails,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while accepting the follow requests.",
        });
    }
}

exports.getPendingFollowingRequests = async (req, res) => {
    try {

        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Login first",
            });
        }

        const userDetails = await User.findById(userId).populate("pendingFollowing").exec();

        const pendingFollowingRequests = userDetails.pendingFollowing;

        if (pendingFollowingRequests.length < 1) {
            return res.status(4200).json({
                success: true,
                message: "No pending Following request",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Pending Following request successfully fetched",
            data: pendingFollowingRequests,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while getting follow requests.",
        });
    }
};

exports.sendFollowRequest = async (req, res) => {
    try {

        const { receivingUser } = req.body;
        const sendingUserId = req.user.id;
        const receive = await User.findById(receivingUser);
        const receivingUserId = receive._id;
        if (!receivingUser) {
            return res.status(400).json({
                success: false,
                message: "Please send to a valid user",
            });
        }

        const sendingUserDetails = await User.findByIdAndUpdate(sendingUserId, { $push: { pendingFollowing: receivingUserId } }, { new: true });
        const receiverUserDetails = await User.findByIdAndUpdate({ _id: receivingUser }, { $push: { pendingFollower: sendingUserId } }, { new: true });

        if (!receiverUserDetails) {
            return res.status(404).json({
                success: false,
                message: "No details found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Request sent successfully",
            receiverUserDetails: receiverUserDetails,
            sendingUserDetails: sendingUserDetails,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while sending follow requests.",
        });
    }
};

exports.getPendingFollowerRequest = async (req, res) => {
    try {

        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Login first",
            });
        }

        const userDetails = await User.findById(userId).populate("pendingFollowing").exec();

        const pendingFollowerRequests = userDetails.pendingFollower;

        if (pendingFollowerRequests.length < 1) {
            return res.status(400).json({
                success: true,
                message: "No pending Follower request",
            });
        }
        return res.status(200).json({
            success: true,
            message: "pending Follower Requests successfully fetched",
            data: pendingFollowerRequests,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while getting follow requests.",
        });
    }
};
