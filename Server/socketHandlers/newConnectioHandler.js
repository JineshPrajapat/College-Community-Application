const serverStore = require("../serverStore");

const newConnectionHandler = (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.id,
  });
};

module.exports = newConnectionHandler;