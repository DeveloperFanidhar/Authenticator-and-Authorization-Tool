import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
    const mongoUri = process.env.MONGODB_URI;
    
    if(!mongoUri) {
        throw new Error("MONGODB_URI is not defined in environment vairables");
    }

    mongoose.set("bufferCommands", false);

    try{
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB Connected Successfully.");
    } catch(error){
        console.error("MongoDB Connection Failed: ",error);
        process.exit(1);
    }
}