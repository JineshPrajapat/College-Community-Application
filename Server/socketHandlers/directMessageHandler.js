const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const serverStore = require("../serverStore");

const getRecieverSocketID = require("./utils/getRecieverSocketID");
const getConversation = require("./utils/getConversation");
const directChatHistoryHandler = require("./directChatHistoryHandler")

let io = null;

const directMessageHandler = async (socket, data) => {
  try {
    console.log("direct message event is being handled");
    console.log("dataData", data)

    const senderID = socket.user.id;
    const receiverID = data?.receiver;

    let conversation = await Conversation.findOne({
      "$or": [
        { sender: senderID, receiver: data?.receiver },
        { sender: data?.receiver, receiver: senderID }
      ]
    });

    // if conversation is not available
    if (!conversation) {
      const createConversation = await Conversation({
        sender: senderID,
        receiver: data?.receiver
      });
      conversation = await createConversation.save();
    }

    const message = new Message({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      msgByUserId: senderID,
    });

    const saveMessage = await message.save();

    const updatedConversation = await Conversation.updateOne({ _id: conversation?._id }, {
      "$push": { messages: saveMessage?._id }
    });

    const getConversationMessage = await Conversation.findOne({
      "$or": [
        { sender: senderID, receiver: data?.receiver },
        { sender: data?.receiver, receiver: senderID }
      ]
    }).populate('messages').sort({ updatedAt: -1 });


    // geting reciver socket id
    const receiverSocketID = getRecieverSocketID(data?.receiver);

    const groupedMessages = getConversationMessage?.messages?.reduce((acc, message) => {
      const date = message.createdAt.toISOString().split('T')[0]; // Get the date part
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    }, {});

    // sending message to both sender and receiver
    if (getConversationMessage) {
      io = serverStore.getSocketServerInstance();
      io.to(socket.id).emit('message', groupedMessages || []);
      io.to(receiverSocketID).emit('message', groupedMessages || [])
    }

    const conversationSender = await getConversation(senderID);
    const conversationReceiver = await getConversation(data?.receiver);

    if (conversationSender) {
      io = serverStore.getSocketServerInstance();
      io.to(socket.id).emit('conversation', conversationSender);
      // io.to(socket.id).emit('conversation', conversationReceiver);
    }

    if(receiverSocketID){
      console.log("receiverSocketID::::>>::>>", receiverSocketID)
      io=serverStore.getSocketServerInstance();
      io.to(receiverSocketID).emit('conversation', conversationReceiver);
    }

  } catch (err) {
    console.log("directmesageHandler", err);
  }
};

module.exports = directMessageHandler;