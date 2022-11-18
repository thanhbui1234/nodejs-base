import User from "../models/user";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const body = req.body;
        const existUser = await User.findOne({ email: body.email });

        if (existUser) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }
        const user = await new User(body).save();
        return res.status(200).json({
            data: user,
        });
    } catch (error) {}
};

export const signin = async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        // check email ton tai
        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại",
            });
        }
        console.log("authenticate", user.authenticate(body.password));
        // check mat khau
        if (!user.authenticate(body.password)) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const token = jwt.sign({ _id: user._id }, "123456");

        user.password = undefined;

        return res.status(200).json({
            data: user,
            accessToken: token,
        });

        // check mat khau
    } catch (error) {}
};
