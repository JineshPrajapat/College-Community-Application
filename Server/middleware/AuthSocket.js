const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
    // console.log("hello")
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    // console.log("decoded", socket.user);
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;