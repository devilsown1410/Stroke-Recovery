import express from "express";
import cors from "cors";
import http from "http"; // Import http module
import { Server } from "socket.io"; // Import socket.io
import 'dotenv/config';
import { connectDB } from "./config/connectDB.js";
import bodyParser from "body-parser";
import chatbot from "./controllers/chatbot.js";

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Adjust based on frontend URL
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectDB();
app.post("/chat", chatbot);

app.get('/', (req, res) => {
    res.send("Hello ji aagye");
});

// Handle WebSocket Connection
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("user_message", async (data) => {
        console.log("User Message:", data.text);
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
            console.log("API Response:", responseData);

            const botReply = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";

            socket.emit("bot_reply", { reply: botReply });
        } catch (error) {
            console.error("Error:", error.message);
            socket.emit("bot_reply", { reply: "Sorry, an error occurred." });
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server connected at ${PORT}`);
});
