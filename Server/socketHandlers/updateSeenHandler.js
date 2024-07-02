const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const serverStore = require("../serverStore");
const getConversation = require("./utils/getConversation");

let io = null;

const updateSeenHandler = async (socket, data) => {
    try {
        const senderID = socket.user.id;
        let msgByUserId = data;

        let conversation = await Conversation.findOne({
            "$or": [
                { sender: senderID, receiver: msgByUserId },
                { sender: msgByUserId, receiver: senderID }
            ]
        });

        const conversationMessageID = conversation?.messages || [];
        const updateMessages = await Message.updateMany(
            { _id: { "$in": conversationMessageID }, msgByUserId: msgByUserId },
            { "$set": { seen: true } }
        );

        const conversationSender = await getConversation(senderID);
        if (conversationSender) {
            io = serverStore.getSocketServerInstance();
            io.to(socket.id).emit('conversation', conversationSender);
        }

    }
    catch (err) {
        console.log(err);
    }
}

module.exports = updateSeenHandler;