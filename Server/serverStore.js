// const { v4: uuidv4 } = require("uuid");

const connectedUsers = new Map();
let io = null;

const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
};

const getSocketServerInstance = () => {
    return io;
};

const getOnlineUsers = () => {
    const onlineUsers = [];

    connectedUsers.forEach((value, key) => {
        onlineUsers.push({ socketId: key, userId: value.userId });
    });

    return onlineUsers;
};

const addNewConnectedUser = ({ socketId, userId }) => {
    // First, remove any existing entries with the same userId
    for (let [key, value] of connectedUsers) {
        if (value.userId === userId) {
            connectedUsers.delete(key);
        }
    }
    // Add the new entry with the latest socketId
    connectedUsers.set(socketId, { userId });
    console.log("connectedUsers", connectedUsers);
};

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
      connectedUsers.delete(socketId);
      console.log("new connected users");
      console.log(connectedUsers);
    }
  };


module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    setSocketServerInstance,
    getSocketServerInstance,
    getOnlineUsers,
};