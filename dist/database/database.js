"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDatabase() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in environment vairables");
    }
    mongoose_1.default.set("bufferCommands", false);
    try {
        await mongoose_1.default.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB Connected Successfully.");
    }
    catch (error) {
        console.error("MongoDB Connection Failed: ", error);
        process.exit(1);
    }
}
