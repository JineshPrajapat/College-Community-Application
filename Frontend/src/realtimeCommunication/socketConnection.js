import io from "socket.io-client";
import { store } from "../Redux/store";
import { setMessages } from "../Redux/messagesSlice";
import { setConversation, setOnlineUser, setCurrentChat } from "../Redux/chatSlice";

let socket = null;

export const connectWithSocketServer = () => {
    socket = io('https://ctae-website-fzxz.vercel.app/', {
        path: '/socket.io',
        auth: {
            token: localStorage.getItem('token')
        },
        transports: ['websocket','polling']
    });

    socket.on("connect", () => {
        console.log("succesfully connected with socket.io server");
        console.log(socket.id);
    });

    socket.on("online-users", (data) => {
        // console.log("online users", data);
        store.dispatch(setOnlineUser(data));
    })

    socket.on("current-user-detail", (data) => {
        console.log("current-user-detail", data);
        store.dispatch(setCurrentChat(data));
    })

    socket.on("direct-chat-history", (data) => {
        console.log(" recieved chat history", data);
        // updateDirectChatHistoryIfActive(data);
    });

    socket.on("conversation", (data) => {
        // console.log("conversation", data);
        store.dispatch(setConversation(data));
        // this display along with last message between sender and all receiver
    });

    socket.on('message', (data) => {
        if (data) {
            console.log('Message data:', data);
            store.dispatch(setMessages(data));
        } else {
            console.error('No data received in message event');
        }
    });

}

export const getCurrentUser = (data) => {
    try {
        if (data) {
            socket.emit("message-page", data);
        }
    }
    catch (err) {
        console.log(err);
    }
}

export const sendDirectMessage = (data) => {
    console.log("handle send message data", data);
    try {
        if (data) {
            socket.emit("direct-message", data);
        }
    }
    catch (err) {
        console.log(err);
    }
};

export const directChatHistory = (data) => {
    console.log("chat history", data);
    try {
        socket.emit("direct-chat-history", data);
    }
    catch (err) {
        console.log("retry", err);
    }
}

export const updateSeen = (data) => {
    try {
        if (data) {
            socket.emit("seen", data);
        }
    }
    catch (err) {
        console.log("retry", err);
    }
}

export const deleteMessage = (data) => {
    try {
        if (data) {
            console.log(data);
            socket.emit("delete-messages", data);
        }
    }
    catch (err) {
        console.log("retry", err);
    }
}