const mailSender = require("../utils/mailSender");
const { ContactTemplate } = require("../mails/ContactTemplate");
require("dotenv").config();

exports.sendContact = async (req, res) => {
    try {
        const { name, subject, message, phoneNumber } = req.body;
        const { userName } = req.params;
        const fromEmail = req.user.email;
        console.log(userName);
        // exctracting user profile details
        const Data = await User.findOne({ username: userName });

        if (!Data) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const toEmail = Data.email;
        const emailInfo = await mailSender(toEmail, subject, ContactTemplate(name, message, phoneNumber, fromEmail));
        if (!emailInfo) {
            console.log("email not sent");
            return res.status(400).json({
                success: false,
                message: "Mail not sent"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });

    }

    catch {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login Failure, try again.",
        });
    }
}