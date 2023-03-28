import dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
dotenv.config();
import User from '../models/user';
interface User {
    email: string;
    password: string;
    name?: string;
    isAdmin?: boolean;
}
interface IRequestWithUser extends Request {
    user: User;
}
export const checkPermission = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization!.split(" ")[1];
        const token = authHeader && authHeader.split[" "];
        const secret: string = process.env.JWT_SECRET!;


        if (!req.headers.authorization) {
            throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
        }
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
            }
            if (decoded && "userId" in decoded) {
                const user = await User.findById(decoded.userId) as User;
                if (user && !user.isAdmin) {
                    throw new Error("Bạn không có quyền để thực hiện hành động này");
                }
                req.user = user
                next();
            }

        });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
