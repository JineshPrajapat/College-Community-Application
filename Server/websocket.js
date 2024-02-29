
const WebSocket = require("ws");
const { connectedClients } = require("./websocketStore");

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("New client connected");

        ws.on("message", (message) => {
            try {
                const parsedMessage = JSON.parse(message);
                const senderId = parsedMessage.senderId;
                const recipientId = parsedMessage.recipientId;
                const content = parsedMessage.content;

                const recipientSocket = connectedClients[recipientId];

                if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
                    recipientSocket.send(JSON.stringify({
                        type: "chat",
                        senderId,
                        content,
                    }));
                }

                ws.send(JSON.stringify({
                    type: "chat",
                    senderId,
                    content,
                }));
            } catch (error) {
                console.error(error);
                ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
            }
        });

        ws.on("close", () => {
            console.log("Client Disconnected");

            Object.keys(connectedClients).forEach(clientId => {
                if (connectedClients[clientId] === ws) {
                    delete connectedClients[clientId];
                }
            });
        });

        ws.on("message", async (message) => {
            const parsedMessage = JSON.parse(message);
            const clientId = parsedMessage.clientId;

            connectedClients[clientId] = ws;

        });
    });
};
