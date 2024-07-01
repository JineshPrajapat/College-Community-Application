const serverStore = require("../../serverStore");

const getRecieverSocketID = (receiverID) => {
    let onlineUsers = serverStore.getOnlineUsers();

    for (let user of onlineUsers) {
        if (user?.userId === receiverID) {
            console.log("key of receiver ", user?.socketId);
            return user?.socketId;
        }
    }

    return null;
}

module.exports = getRecieverSocketID;