const Message = require("../models/message");
const Conversation = require("../models/conversation");
const serverStore = require("../serverStore");
const mongoose = require("mongoose");
const directChatHistoryHandler = require("./directChatHistoryHandler");

const deleteMessageHandler = async (socket, data) => {
    console.log("dletion data key", data);

    const userID = socket.user.id;
    const receiverID = data?.currentChat;

    try {
        await Message.deleteMany({ _id: { $in: data?.selectedMessages } });

        await Conversation.updateOne({
            "$or": [
                { sender: userID, receiver: receiverID },
                { sender: receiverID, receiver: userID }
            ]
        },
            { $pull: { messages: { $in: data?.selectedMessages } } }
        );
    }
    catch (error) {
        // If an error occurs, abort the transaction to roll back changes
        console.error('Error deleting messages or updating conversation:', error);
    } finally {
        directChatHistoryHandler(socket,receiverID);
    }

}

module.exports = deleteMessageHandler;