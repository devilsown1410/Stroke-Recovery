import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://shubhanshvaish12:KhDJEpEAKlGg0quD@cluster0.32sik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(
        console.log("DB Connected Successfully")
    )
}