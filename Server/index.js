require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http")
const setupWebSocket = require("./websocket");

const server = http.createServer(app);

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const questionsRoutes = require("./routes/Questions");
const experienceRoutes = require("./routes/Experiences");
const opportunityRoutes = require("./routes/Opportunity")
const discussRoutes = require("./routes/Discuss");
const submitInfoRoutes =  require("./routes/SubmitInformation");


const searchRoutes = require("./routes/Search");
const requestRoutes = require("./routes/Request");
const postRoutes = require("./routes/Post");
const notificationRoutes = require("./routes/Notification");
const messageRoutes = require("./routes/Message");
const broadcastRoutes = require("./routes/Broadcast");
const adminRoutes = require("./routes/Admin");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());
// app.use(cors({setAllowedOrigin:"*", origin: ["https://localhost:4000","https://localhost:3000", "https://localhost:3001" ], credentials: true, }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp", }));
app.use(express.static('../public'));
cloudinaryConnect();

// app.use(express.urlencoded({extended:false}));
// "app.use(cors(*));"
app.use(cors());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/userinfo", submitInfoRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/profile", profileRoutes);         //profile update after signup
app.use("/api/v1/questions", questionsRoutes);
app.use("/api/v1/experience", experienceRoutes);
app.use("/api/v1/opportunity", opportunityRoutes);
app.use("/api/v1/discuss", discussRoutes);





app.use("/api/v1/broadcast", broadcastRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/request", requestRoutes);
app.use("/api/v1/search", searchRoutes);

setupWebSocket(server);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your server is up and running..."
    });
    res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
