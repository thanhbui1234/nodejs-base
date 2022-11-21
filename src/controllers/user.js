import User from "../models/user";

export const userById = async (req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }

    req.profile = user;

    next();
};
