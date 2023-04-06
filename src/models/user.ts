import mongoose, { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
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
    { timestamps: true, versionKey: false }
);
export default mongoose.model("User", userSchema);
