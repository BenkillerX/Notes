import mongoose from "mongoose";
import dns from 'dns';

dns.setServers([
    "1.1.1.1","1.0.0.1"
])

export async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected successfully ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Error Connecting To mongoDB",error.message);
        
    }
}