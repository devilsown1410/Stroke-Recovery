import express from "express";
import cors from "cors";
import 'dotenv/config'
import { connectDB } from "./config/connectDB.js";

const app=express();
const allowedOrigins = [
    'http://localhost:5173',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions))

connectDB();


app.get('/',(req,res)=>{
    res.send("Hello ji aagye")
})

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server connected at ${PORT}`);
})
