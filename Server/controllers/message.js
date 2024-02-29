const User = require("../models/User");
const Message = require("../models/Message");
const { connectedClients } = require("../websocketStore");

// Function to get the recipient's WebSocket connection
function getRecipientSocket(recipientId) {
    return connectedClients[recipientId];
}

exports.sendMessage = async (req, res) => {
    try {
        const { recipientId, content } = req.body;
        const senderId = req.user.id;

        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);

        if (!sender || !recipient) {
            return res.status(404).json({
                success: false,
                message: "Sender or recipient not found",
            });
        }

        const newMessage = new Message({
            content,
            from: senderId,
            to: recipientId,
        });
        const savedMessage = await newMessage.save();

        const recipientSocket = getRecipientSocket(recipientId);

        if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
            recipientSocket.send(JSON.stringify({
                type: "chat",
                senderId,
                content: savedMessage.content,
                messagedAt: savedMessage.messagedAt,
            }));
        }
        res.status(200).json({
            success: true,
            message: "Chat between two users",
            from: sender,
            to: recipient,
            messages: savedMessage,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while sending message",
        });
    }
}

exports.getMessage= async (req, res) => {
    try {
        const userId  = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const messages = await Message.find({ $or: [{ from: userId }, { to: userId }] })
            .populate("from", "username") // Assuming you have a 'username' field in your User model
            .populate("to", "username")
            .sort({ messagedAt: 1 });

        return res.status(200).json({
            success: true,
            message: "Messages found",
            messages: messages,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while getting messages",
        });
    }
}


// exports.getMessage = async (req, res) => {
//     try {

//         const userId = req.user.id;
//         const userDetails = await User.findById(userId);
//         const followings = userDetails.following;

//         const messages = (await User.find({},
//             { "_id": { $in: { followings } } }));

//         if (!messages) {
//             return res.status(200).json({
//                 success: true,
//                 message: "User not stated messaging",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Messages found",
//             messages: messages,
//         });

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: err.message + "error while getting messages",
//         });
//     }
// };

// exports.sendMessage = async (req, res) => {
//     try {

//         const { to, content } = req.body;
//         const from = req.user.id;

//         const senderDetails = await User.findById(from);
//         const receiverDetails = await User.findById(to);

//         if (!receiverDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No user found",
//             });
//         }

//         if (!(receiverDetails.follower.includes(from) && senderDetails.following.includes(to))) {
//             return res.status(400).json({
//                 success: false,
//                 message: "You can't send message to person whom you doesn't follow.",
//             });
//         }

//         const recentMessage = await Message.create({
//             content: content,
//             from: from,
//             to: to,
//         });

//         const messageDetails = await Message.find(
//             {
//                 $and: [{ from: from }, { to: to }]
//             },
//             {
//                 $sort: { messagedAt: 1 }
//             }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Chat between two users",
//             from: from,
//             to: to,
//             recentMessage: recentMessage,
//             messages: messageDetails,
//         });

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: err.message + "error while sending message",
//         });
//     }
// };