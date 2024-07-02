const Conversation = require("../models/Conversation");
const serverStore = require("../serverStore");

let io = null;
const directChatHistoryHandler = async (socket, data) => {
    try {
        const userID = socket.user.id;
        const receiverID = data;

        console.log("receiver ID", receiverID);

        const getConversationMessage = await Conversation.findOne({
            "$or": [
                { sender: userID, receiver: receiverID },
                { sender: receiverID, receiver: userID }
            ]
        }).populate('messages').sort({ updatedAt: -1 });

        // console.log("getConversationMessage", getConversationMessage);

        const groupedMessages = getConversationMessage?.messages?.reduce((acc, message) => {
            const date = message.createdAt.toISOString().split('T')[0]; // Get the date part
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(message);
            return acc;
          }, {});

          console.log("groupedMessages", groupedMessages);


        if (getConversationMessage) {
            io = serverStore.getSocketServerInstance();

            if (socket.id) {
               io.to(socket.id).emit("direct-chat-history", getConversationMessage);
            //    io.to(receiverID).emit("direct-chat-history", getConversationMessage);
            }
        }
        else{
            io.to(socket.id).emit("direct-chat-history", "No conversation")
        }
        // io.to(socket.id).emit('message', getConversationMessage?.messages || [])
        io.to(socket.id).emit('message', groupedMessages || [])
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = directChatHistoryHandler;
