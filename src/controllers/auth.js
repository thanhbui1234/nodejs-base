import User from "../models/user";

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
