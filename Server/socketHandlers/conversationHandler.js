const Conversation = require("../models/Conversation");
const serverStore = require("../serverStore");
const getRecieverSocketID = require("./utils/getRecieverSocketID");
const getConversation = require("./utils/getConversation");

let io = null;

const conversationHandler = async (socket) => {
    try {
        console.log("converationHandler invoked");
        const userId = socket.user.id;

        const conversationSender = await getConversation(userId);

        if(conversationSender) {
            io = serverStore.getSocketServerInstance();
            console.log("conversationSender", conversationSender);
            io.to(socket.id).emit('conversation', conversationSender);
        }
    }

    catch (err) {
        console.log(err);
    }
}

module.exports = conversationHandler;