const User = require("../models/User");

exports.getNotification = async (req, res) => {
    try {

        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        if (!userDetails.notification) {
            return res.status(200).json({
                success: true,
                message: "No notifications",
                picture: userDetails.profileImage,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification Details",
            notification: userDetails.notification,
            picture: userDetails.profileImage,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while getting notifications",
        });
    }
};

exports.getActivity = async (req, res) => {
    try {

        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        if (!userDetails.activity) {
            return res.status(200).json({
                success: true,
                message: "No Activities",
                picture: userDetails.profileImage,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Activity Details",
            activity: userDetails.activity,
            picture: userDetails.profileImage,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while getting activity",
        });
    }
};