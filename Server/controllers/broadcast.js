const User = require("../models/User");

exports.sendBroadCast = async (req, res) => {
    try {
        const { college, year, department, messageContent } = req.body;
        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        if (college === "All") {

            const users = await User.find({});
            let mesage = userDetails.firstName + ' broadcasted a message :- ' + messageContent + "for everyone";
            users.forEach((user) => {
                user.notification = [mesage, ...user.notification];
                user.save();
            });

            return res.status(200).json({
                success: true,
                message: "Message broadcasted succesfully.",
                broadcastingMessage: messageContent,
            });

        }
        else if (department === "All") {

            const users = await User.find({ collegeName: college });

            let mesage = userDetails.firstName + ' broadcasted a message :- ' + messageContent + "for everyone";
            users.forEach((user) => {
                user.notification = [mesage, ...user.notification];
                user.save();
            });

            return res.status(200).json({
                success: true,
                message: "Message broadcasted succesfully.",
                broadcastingMessage: messageContent,
            });

        }
        else if (year === "All") {

            const users = await User.find({ $and: [{ collegeName: college }, { departmentName: department }] });

            let mesage = userDetails.firstName + ' broadcasted a message :- ' + messageContent + "for everyone";
            users.forEach((user) => {
                user.notification = [mesage, ...user.notification];
                user.save();
            });

            return res.status(200).json({
                success: true,
                message: "Message broadcasted succesfully.",
                broadcastingMessage: messageContent,
            });

        }
        else {

            const users = await User.find(
                {
                    $and: [
                        { collegeName: college },
                        { departmentName: department },
                        { year: year }
                    ]
                }
            );

            let mesage = userDetails.firstName + ' broadcasted a message :- ' + messageContent + "for everyone";
            users.forEach((user) => {
                user.notification = [mesage, ...user.notification];
                user.save();
            });

            return res.status(200).json({
                success: true,
                message: "Message broadcasted succesfully.",
                broadcastingMessage: messageContent,
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while sending bradcast message",
        });
    }
};

exports.getBroadCast = async (req, res) => {
    try {

        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        const broadcastMessage = userDetails.notification;

        res.status(200).json({
            success: true,
            message: "Broadcast fetched successfully.",
            broadCast: broadcastMessage,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while searching for broadcast",
        });
    }
}