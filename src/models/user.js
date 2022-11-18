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
userSchema.methods = {
    authenticate(password) {
        // mat khau tu client gui len
        console.log("Mat khau client gui len", password);
        // mat khau trong database
        console.log("Mat khau trong database", this.password);
        console.log("Mat khau da ma hoa", this.encryptPassword(password));
        return this.password === this.encryptPassword(password);
    },
    encryptPassword(password) {
        if (!password) return "";
        return createHmac("sha256", "123456").update(password).digest("hex");
    },
};
userSchema.pre("save", function (next) {
    this.password = this.encryptPassword(this.password);
    next();
});
export default mongoose.model("User", userSchema);
