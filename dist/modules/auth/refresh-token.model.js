"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
const mongoose_1 = require("mongoose");
const RefreshTokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true
    },
    tokenHash: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});
exports.RefreshTokenModel = (0, mongoose_1.model)("RefreshToken", RefreshTokenSchema);
