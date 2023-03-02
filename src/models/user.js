import mongoose from "mongoose";
import { createHmac } from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: 6,
            maxLength: 255,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
    },
    { timestamps: true }
);
export default mongoose.model("User", userSchema);
