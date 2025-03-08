import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';
import { connectDB } from "./config/connectDB.js";
import podcastRouter from './routes/podcast.js';
import Games from './routes/Games.js';
import Activity from './routes/Activity.js';
import Login from './routes/Login.js';
import Signin from './routes/Signin.js';
import { insert } from "./insert.js";
import bodyParser from "body-parser";
import chatbot from "./controllers/chatbot.js";
import AllDoctors from "./routes/AllDoctors.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import fs from 'fs';
import { google } from 'googleapis';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
    transports: ["websocket"],
    pingTimeout: 60000,
    pingInterval: 25000,
});

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());

// Database Connection
connectDB().then(() => console.log("✅ MongoDB Connected")).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
});

app.post("/chat", chatbot);
// insert();

app.use('/api/podcast', podcastRouter);
app.use('/api/games', Games);
app.use('/api/activity', Activity);
app.use('/api/all-doctor', AllDoctors);
app.use('/api/appointments', appointmentRouter);
app.use('/api/login', Login);
app.use('/api/signin', Signin);

// Google API OAuth2 Setup
let credentials;
try {
    credentials = JSON.parse(fs.readFileSync("credentials.json", "utf8"));
} catch (error) {
    console.error("❌ Error reading credentials.json:", error.message);
    process.exit(1);
}

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

async function refreshToken() {
    try {
        const tokenData = fs.readFileSync("token.json", "utf-8");
        const tokens = JSON.parse(tokenData);

        if (!tokens.access_token) {
            console.error("❌ No access token found. Authenticate first.");
            return;
        }

        oAuth2Client.setCredentials(tokens);
    } catch (error) {
        console.error("⚠️ No existing token found. Authenticate first.");
    }
}


const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

app.get("/auth", (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({ access_type: "offline", scope: SCOPES });
    res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
    try {
        const code = req.query.code;
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        res.send("Authentication successful! You can now create meetings.");
    } catch (error) {
        console.error("❌ Authentication error:", error.message);
        res.status(500).send("Authentication failed.");
    }
});

app.get("/create-meeting", async (req, res) => {
    try {
        await refreshToken(); // Ensure we have valid tokens

        const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

        const event = {
            summary: "Google Meet Meeting",
            start: { dateTime: new Date().toISOString(), timeZone: "Asia/Kolkata" },
            end: { dateTime: new Date(Date.now() + 30 * 60000).toISOString(), timeZone: "Asia/Kolkata" },
            conferenceData: {
                createRequest: { requestId: "random-id", conferenceSolutionKey: { type: "hangoutsMeet" } },
            },
        };

        const response = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1,
        });

        res.json({ meetLink: response.data.hangoutLink || "No meet link available" });
    } catch (error) {
        console.error("❌ Meeting creation error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });

    }
});



// app.get("/create-meeting", async (req, res) => {
//     try {
//         await refreshToken();  // Ensure valid credentials before proceeding

//         const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

//         const event = {
//             summary: "Google Meet Meeting",
//             start: { dateTime: new Date().toISOString(), timeZone: "Asia/Kolkata" },
//             end: { dateTime: new Date(new Date().getTime() + 30 * 60000).toISOString(), timeZone: "Asia/Kolkata" },
//             conferenceData: {
//                 createRequest: { requestId: "random-id", conferenceSolutionKey: { type: "hangoutsMeet" } },
//             },
//         };

//         const response = await calendar.events.insert({
//             calendarId: "primary",
//             resource: event,
//             conferenceDataVersion: 1,
//         });

//         res.json({ meetLink: response.data.hangoutLink });

//     } catch (error) {
//         console.error("❌ Error creating Google Meet:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

app.get('/', (req, res) => res.send("Hello ji aagye"));

// WebSockets
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
                    contents: [{ parts: [{ text: `Health-related queries only.\n\nUser Query: ${data.text}` }] }]
                }),
            });

            const responseData = await response.json();
            const botReply = responseData?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";

            socket.emit("bot_reply", { reply: botReply });
        } catch (error) {
            console.error("❌ Error:", error.message);
            socket.emit("bot_reply", { reply: "Sorry, an error occurred." });
        }
    });

    socket.on("disconnect", (reason) => console.log(`❌ User disconnected: ${socket.id}, Reason: ${reason}`));
});

// Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
