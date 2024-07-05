const User = require("../models/User");
const serverStore = require("../serverStore");


const messagePageHandler = async (socket, data) => {
    console.log("currentUsername", data);
    const userDetails = await User.findOne({ username: data }).populate("profileDetails");
    let onlineUser = serverStore.getOnlineUsers();
    if (userDetails) {
        const userExists = onlineUser.some(user => user.userId == userDetails?._id);
        console.log("UserExist", userExists);

        const payload = {
            _id: userDetails?._id,
            name: userDetails?.profileDetails?.fullName,
            email: userDetails?.email,
            profileImage: userDetails?.profileImage,
            online: userExists
        }

        if (payload) {
            io = serverStore.getSocketServerInstance();
            io.to(socket.id).emit("current-user-detail", payload)
        }
    }
    else{
        console.log("No user exist with this username");
    }
    
}

module.exports = messagePageHandler;