import { Schema, model, Types } from "mongoose";

export interface RefreshTokenDocument {
    userId: Types.ObjectId;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
}

const RefreshTokenSchema = new Schema<RefreshTokenDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        }
    }
);

export const RefreshTokenModel = model<RefreshTokenDocument>("RefreshToken", RefreshTokenSchema);