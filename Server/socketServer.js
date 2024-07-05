const { Server } = require("socket.io");
const authSocket = require("./middleware/AuthSocket");
const serverStore = require("./serverStore");
const newConnectionHandler = require("./socketHandlers/newConnectioHandler");
const directMessageHandler  = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const conversationHandler = require("./socketHandlers/conversationHandler");
const updateSeenHandler = require("./socketHandlers/updateSeenHandler");
const messagePageHandler = require("./socketHandlers/messagePageHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const deleteMessageHandler = require("./socketHandlers/deleteMessageHandler");

// const createAdapter = require("@socket.io/cluster-adapter");
const allowedOrigins = [
  'https://ctae-website.vercel.app',
  'http://localhost:3000',
  'https://collegechatts.netlify.app',
];

module.exports.initializeSocketServer = async (server) => {
  const io = new Server(server, {
    connectionStatesRecovery: {},
    path: '/socket.io',
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
    },
    // adapter: createAdapter()
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    // console.log("online Users", onlineUsers);
    io.emit("online-users", { onlineUsers });
  };


  io.on('connection', (socket) => {
    console.log("user connected!");
    console.log("socket_id", socket.id);

    newConnectionHandler(socket, io);
    emitOnlineUsers();
    conversationHandler(socket);
    // console.log("socket_id", socket.id);

    socket.on("message-page", (data)=>{
      messagePageHandler(socket, data);
    })

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("seen", (data) =>{
      updateSeenHandler(socket, data);
    })

    socket.on("delete-messages", (data) =>{
      deleteMessageHandler(socket, data);
    })

    socket.on("disconnect", () => {
      console.log("disconnected ,....");
      disconnectHandler(socket);
    });

    setInterval(() => {
      emitOnlineUsers();
    }, [1000 * 8]);
  });
}