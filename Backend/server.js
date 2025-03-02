import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import 'dotenv/config';
import { connectDB } from "./config/connectDB.js";
import podcastRouter from './routes/podcast.js';
import { insert } from "./insert.js";
import bodyParser from "body-parser";
import chatbot from "./controllers/chatbot.js";

const app = express();
const server = http.createServer(app); 

// 🔹 Update Socket.io configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
    transports: ["websocket"],  // 🚀 Force WebSocket only
    pingTimeout: 60000,  // ⏳ Extend timeout
    pingInterval: 25000, // 🔄 Keep connection alive
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectDB();


app.get('/', (req, res) => {
    res.send("Hello ji aagye");
});

// 🔹 WebSocket Connection Handling
io.on("connection", (socket) => {
    console.log(`🔗 User connected: ${socket.id}`);

    socket.on("user_message", async (data) => {
        console.log(`📩 User Message Received: ${data.text}`);
        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: data.text }] }]
                }),
            });

            const responseData = await response.json();
            console.log("📝 API Response:", responseData);

            const botReply = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";

            socket.emit("bot_reply", { reply: botReply });
        } catch (error) {
            console.error("❌ Error:", error.message);
            socket.emit("bot_reply", { reply: "Sorry, an error occurred." });
        }
    });

    socket.on("disconnect", (reason) => {
        console.log(`❌ User disconnected: ${socket.id}, Reason: ${reason}`);
        if (reason === "ping timeout") {
            console.log("⚠️ Possible cause: Server is not responding to pings.");
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
