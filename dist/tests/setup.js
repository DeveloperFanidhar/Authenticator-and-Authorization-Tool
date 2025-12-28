"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("../app");
dotenv_1.default.config({ path: ".env" });
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined. Please set it in your .env file.");
}
exports.app = (0, app_1.createApp)();
beforeAll(async () => {
    await mongoose_1.default.connect(mongoUri, {
        autoIndex: true
    });
});
afterAll(async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
});
