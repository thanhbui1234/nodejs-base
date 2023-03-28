import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SCRET_KEY);
        const user = await User.findById(decodedToken.userId);
        if (!user.isAdmin) {
            throw new Error("Bạn không có quyền để thực hiện hành động này");
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
